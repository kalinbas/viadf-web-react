import React, { Component } from 'react'
import {
    Container,
    Menu,
    Grid,
    Table,
    Dimmer,
    Loader
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet";
import superagent from "superagent";


export default class RouteList extends Component {

    state = {
        lists: {},
        isLoading: true
    }

    componentDidMount() {
        this.load(this.props.match.params.type)
    }

    componentWillReceiveProps(nextProps) {
        // if type changed   
        if (nextProps.match.params.type !== this.props.match.params.type) {
            this.load(nextProps.match.params.type)
        }
    }

    load(type) {
        if (type && !this.state.lists[type]) {
            this.setState({ isLoading: true });
            superagent.get('https://viadf.mx/service/GetType')
                .query({ name: type })
                .end((err, res) => {
                    if (res.body) {
                        var lists = { ...this.state.lists };
                        lists[type] = res.body;
                        this.setState({ lists })
                    }
                    this.setState({ isLoading: false });
                });
        }
    }

    render() {

        const routes = [
            { name: "Metro", seoName: "metro" },
            { name: "Metrobús", seoName: "metrobus" },
            { name: "RTP", seoName: "rtp" },
            { name: "Microbús", seoName: "microbus" },
            { name: "Tren Ligero", seoName: "tren-ligero" },
            { name: "Trolebús", seoName: "trolebus" },
            { name: "Pumabús", seoName: "pumabus" },
            { name: "Tren Suburbano", seoName: "tren-suburbano" },
            { name: "Mexibús", seoName: "mexibus" }
        ];

        var type = routes.find(r => r.seoName === this.props.match.params.type);
        var typeName = type ? type.name : null;

        return (
            <Container text>
                <Helmet>
                    <title>{typeName ? 'ViaDF - Lista de rutas del ' + typeName + ' de la Ciudad de México y del Estado de México' : 'ViaDF - Directorio del transporte público de la Ciudad de México y del Estado de México'}</title>
                    <meta name="description" content={typeName ? 'Lista de todas las rutas del ' + typeName + ' en la Ciudad de México y en el Estado de México.' : 'Directorio de las rutas y estaciones del transporte público en la Ciudad de México y del Estado de México.'} />
                    <meta name="keywords" content={(typeName ? typeName : 'directorio') + ', como llegar, como llego, lista rutas, transporte público, méxico, ciudad de méxico, cdmx, estado de méxico'} />
                </Helmet>

                <h1>{typeName ? 'Rutas de ' + typeName : 'Directorio de rutas'}</h1>
                { typeName 
                    ? 
                    <p>En este directorio encontrarás un listado de todas las rutas del { typeName }.</p>
                    :
                    <p>En este directorio encontrarás un listado de todas las rutas del transporte público de la <Link to={'/directorio/distrito-federal'}>Ciudad de México</Link> y del <Link to={'/directorio/estado-de-mexico'}>Estado de México</Link>. Selecciona un tipo de transporte para ver la lista de las rutas.</p>
                }
                             

                <Grid>
                    <Grid.Column width={4}>
                        <Menu fluid vertical tabular>
                            {
                                routes.map(r => <Menu.Item key={r.seoName} as={Link} to={'/directorio/' + r.seoName} content={r.name} active={this.props.match.params.type === r.seoName} />)
                            }
                        </Menu>
                    </Grid.Column>
                    <Grid.Column stretched width={12}>
                        {this.props.match.params.type &&
                            <Dimmer.Dimmable dimmed={this.state.isLoading}>
                                <Dimmer active={this.state.isLoading} inverted>
                                    <Loader>Cargando datos...</Loader>
                                </Dimmer>
                                <Table celled style={{ margin: 0 }}>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>Nombre</Table.HeaderCell>
                                            <Table.HeaderCell>Origen</Table.HeaderCell>
                                            <Table.HeaderCell>Destino</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {
                                            this.state.lists[this.props.match.params.type] && this.state.lists[this.props.match.params.type].routes.map(r => (
                                                <Table.Row key={r.link}>
                                                    <Table.Cell><Link to={r.link}>{r.name}</Link></Table.Cell>
                                                    <Table.Cell>{r.from}</Table.Cell>
                                                    <Table.Cell>{r.to}</Table.Cell>
                                                </Table.Row>))
                                        }

                                    </Table.Body>
                                </Table>
                            </Dimmer.Dimmable>
                        }
                    </Grid.Column>
                </Grid>

            </Container>
        );
    }
}