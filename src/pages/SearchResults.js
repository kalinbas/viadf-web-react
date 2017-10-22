import React, { Component } from 'react'
import {
    Accordion,
    Table,
    Container,
    Dimmer,
    Loader,
    Icon,
    Menu
} from 'semantic-ui-react'

import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet";
import superagent from "superagent";

import RouteMap from '../components/RouteMap'
import LoadingPlaceholder from '../components/LoadingPlaceholder'


export default class SearchResults extends Component {

    state = {
        result: { Results: [] },
        selectedIndex: 0,
        hoverIndex: -1,
        activeIndex: -1,
        isLoading: true,
        showMap: true
    }

    componentDidMount() {
        var params = this.getSearchParams(this.props.location.search);
        if (params.de && params.origen && this.props.onSetFrom) {
            this.props.onSetFrom(this.createLocation(params.origen, params.de));
        }
        if (params.a && params.destino && this.props.onSetTo) {
            this.props.onSetTo(this.createLocation(params.destino, params.a));
        }
        this.doSearch(this.props.location.search)
    }

    createLocation(name, coords) {
        return { name, lat: coords.split(',')[0], lng: coords.split(',')[1] };
    }

    componentWillReceiveProps(nextProps) {
        // if location changed
        if (nextProps.location.search !== this.props.location.search) {
            this.doSearch(nextProps.location.search)
        }
    }

    getSearchParams(search) {
        const params = new URLSearchParams(search);
        return { de: params.get('de'), a: params.get('a'), origen: params.get('origen'), destino: params.get('destino') };
    }

    doSearch(search) {
        const params = this.getSearchParams(search);

        if (params.de && params.a) {
            this.setState({ isLoading: true });
            superagent.get('https://viadf.mx/service/search')
                .query({ de: params.de, a: params.a, count: 3, key: '0NSlW6dbj57EoyH3i0yQ3yI575kI8mb4' })
                .end((err, res) => {
                    if (res.body) {
                        this.setState({ result: res.body, selectedIndex: 0, hoverIndex: -1, activeIndex: -1 })
                    }
                    this.setState({ isLoading: false });
                });
        }
    }

    handleMenuClick = (e, { index }) => {
        this.setState({ selectedIndex: index, hoverIndex: -1, activeIndex: -1 })
    }

    handleItemClick = () => {
        this.setState(prevState => {
            return { activeIndex: prevState.hoverIndex === prevState.activeIndex ? -1 : prevState.hoverIndex }
        })
    }

    handleMouseEnter = (index) => {
        this.setState({ hoverIndex: index })
    }

    handleMouseLeave = () => {
        this.setState({ hoverIndex: -1 })
    }

    toggleMap = () => {
        this.setState(prevState => { return { showMap: !prevState.showMap } })
    }

    render() {

        const { result, selectedIndex, hoverIndex, activeIndex, showMap } = this.state;

        const highlightIndex = hoverIndex >= 0 ? hoverIndex : activeIndex;

        const selectedResult = result.Results && result.Results.length > selectedIndex ? result.Results[selectedIndex] : null;

        const params = this.getSearchParams(this.props.location.search)

        let title = null;
        let pieces = [];
        let highlightPieces = [];
        if (selectedResult) {
            title = '¿Cómo llego de ' + (params.origen || selectedResult.Start.Name || "Inicio") + ' a ' + (params.destino || selectedResult.End.Name || "Destino") + '?'
            selectedResult.Items.forEach((i, index) => {
                i.Path.forEach(p => {
                    pieces.push({ lat: p.Lat, lng: p.Lng })
                    if (highlightIndex === index) highlightPieces.push({ lat: p.Lat, lng: p.Lng })
                })
            });
        }

        return (
            <Container text>
                {!selectedResult && <LoadingPlaceholder message="Buscando rutas..." />}

                {
                    selectedResult &&
                    <Container>
                        <Helmet>
                            <title>{'ViaDF - ' + title}</title>
                        </Helmet>
                        <Dimmer.Dimmable dimmed={this.state.isLoading}>
                            <Dimmer active={this.state.isLoading} inverted>
                                <Loader>Buscando rutas...</Loader>
                            </Dimmer>

                            <h1>{title}</h1>
                            {result.Results.length > 1 &&
                                <Menu fluid widths={result.Results.length} borderless>
                                    {
                                        result.Results.map((r, i) =>
                                            <Menu.Item key={i} index={i} content={'Opción ' + (i + 1) + ' (' + Math.round(r.TotalTime) + 'min)'} active={selectedIndex === i} onClick={this.handleMenuClick} />
                                        )
                                    }
                                </Menu>
                            }
                            <Accordion>
                                <Accordion.Title index={0} active={showMap} onClick={this.toggleMap}>
                                    <Icon name='dropdown' />{showMap ? "Ocultar" : "Abrir"} mapa
                                </Accordion.Title>
                                <Accordion.Content active={showMap}>
                                    <RouteMap pieces1={pieces} highlightPieces={highlightPieces}></RouteMap>
                                </Accordion.Content>
                            </Accordion>
                            <Table basic='very' celled selectable collapsing>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell></Table.HeaderCell>
                                        <Table.HeaderCell>Cómo</Table.HeaderCell>
                                        <Table.HeaderCell>Lugar</Table.HeaderCell>
                                        <Table.HeaderCell>Duración</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {
                                        selectedResult.Items.map((item, index) => {
                                            if (!item.Route) {
                                                return <Table.Row key={index} index={index} active={activeIndex === index} onClick={this.handleItemClick} onMouseEnter={this.handleMouseEnter.bind(this, index)} onMouseLeave={this.handleMouseLeave}>
                                                    <Table.Cell></Table.Cell>
                                                    <Table.Cell>{item.Start.Route && item.End.Route ? 'Cambiar de ' + item.Start.Route.Type.Name + ' a ' + item.End.Route.Type.Name : 'Caminando'}</Table.Cell>
                                                    <Table.Cell>{!item.Start.Route ? "De " + (item.Start.Name || "Inicio") : (!item.End.Route ? "A " + (item.End.Name || "Destino") : "")}</Table.Cell>
                                                    <Table.Cell>{Math.round(item.Time)} min</Table.Cell>
                                                </Table.Row>
                                            } else {
                                                return <Table.Row key={index} index={index} active={activeIndex === index} onClick={this.handleItemClick} onMouseEnter={this.handleMouseEnter.bind(this, index)} onMouseLeave={this.handleMouseLeave}>
                                                    <Table.Cell><Icon size="large" name={item.Type.Name === "Metro" ? "subway" : "bus"} /></Table.Cell>
                                                    <Table.Cell>En <Link to={item.Route.Link}>{item.Type.Name + " " + item.Route.Name}</Link> hacía {item.InDirection}</Table.Cell>
                                                    <Table.Cell>
                                                        Subir en {item.Start.Name ? item.Start.Name + (item.Start.Route ? " (" + item.Start.Route.Name + ")" : "") : "revisar en el mapa*"}<br />
                                                        Bajar en {item.End.Name ? item.End.Name + (item.End.Route != null ? " (" + item.End.Route.Name + ")" : "") : "revisar en el mapa*"}
                                                    </Table.Cell>
                                                    <Table.Cell>{Math.round(item.Time)} min</Table.Cell>
                                                </Table.Row>
                                            }
                                        })
                                    }
                                </Table.Body>
                            </Table>
                        </Dimmer.Dimmable>
                    </Container>
                }
            </Container>
        );
    }
}