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

export default class DelegacionList extends Component {

    state = {
        estado: { delegaciones: [] },
        delegaciones: {},
        isLoading: true
    }

    componentDidMount() {
        let name = this.getEstadoSeoName()
        this.loadEstado(name)
        if (this.props.match.params.delegacion) {
            this.loadDelegacion(name, this.props.match.params.delegacion)
        }
    }

    getEstadoSeoName() {
        return this.props.location.pathname.split('/')[2];
    }

    componentWillReceiveProps(nextProps) {
        // if type changed   
        if (nextProps.match.params.delegacion !== this.props.match.params.delegacion) {
            this.loadDelegacion(this.getEstadoSeoName(), nextProps.match.params.delegacion)
        }
    }

    loadEstado(name) {
        if (name && this.state.estado.delegaciones.length === 0) {
            this.setState({ isLoading: true });
            superagent.get('https://viadf.mx/service/GetEstado')
            .query({ name: name })
            .end((err, res) => {
                if (res.body) {
                    this.setState({ estado: res.body })
                }
                this.setState({ isLoading: false });
            });
        }
    }

    loadDelegacion(estado, name) {
        if (estado && name && !this.state.delegaciones[name]) {
            this.setState({ isLoading: true });
            superagent.get('https://viadf.mx/service/GetDelegacion')
            .query({ estado: estado, name: name})
            .end((err, res) => {
                if (res.body) {
                    var delegaciones = { ...this.state.delegaciones };
                    delegaciones[name] = res.body;
                    this.setState({ delegaciones })
                }
                this.setState({ isLoading: false });
            });
        }
    }

    render() {

        // find delegacion selected
        var delegacion = this.state.estado.delegaciones.find(d => d.seoName === this.props.match.params.delegacion);

        var name = ((delegacion && delegacion.name + " - ") || "") + (this.state.estado && (this.state.estado.name || ""));

        return (
            <Container>
                <Helmet>
                    <title>{ 'Transporte público en ' + name + ' - ¿Cómo llegar? | ViaDF' }</title>
                </Helmet>

                <h1>Transporte público { name && ' de ' + (name || '')}</h1>
                <p>En esta lista puedes ver todas las colonias { name && ' de ' + (name || '')}. Si quieres saber que rutas del transporte público hay en cierta colonia, buscala en la lista y haz clic sobre ella.</p>

                <Grid>
                    <Grid.Column width={4}>
                        <Menu fluid vertical tabular>
                            {
                                this.state.estado.delegaciones.map(r => <Menu.Item as={Link} key={r.seoName} to={r.link} content={r.name} active={this.props.match.params.delegacion === r.seoName} />)
                            }
                        </Menu>
                    </Grid.Column>
                    <Grid.Column stretched width={12}>
                        {this.props.match.params.delegacion &&
                            <Dimmer.Dimmable dimmed={this.state.isLoading}>
                                <Dimmer active={this.state.isLoading} inverted>
                                    <Loader>Cargando datos...</Loader>
                                </Dimmer>
                                <Table compact="very" style={{margin: 0}}>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>Colonia</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {
                                            this.state.delegaciones[this.props.match.params.delegacion] && this.state.delegaciones[this.props.match.params.delegacion].colonias.map(r => (
                                                <Table.Row>
                                                    <Table.Cell><Link to={r.link}>{r.name}</Link></Table.Cell>
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