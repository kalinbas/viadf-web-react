import React, { Component } from 'react'
import {
    Breadcrumb,
    Container,
    Grid,
    Table
} from 'semantic-ui-react'

import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet";
import superagent from "superagent";

import RouteMap from '../components/RouteMap'
import LoadingPlaceholder from '../components/LoadingPlaceholder'



export default class RouteDetail extends Component {

    state = {
        route: null,
        isLoading: true
    }

    componentDidMount() {
        this.loadRoute(this.props.match.params.type, this.props.match.params.name)
    }

    loadRoute(type, name) {
        if (type && name) {
            this.setState({ isLoading: true });
            superagent.get('https://viadf.mx/service/GetRoute')
                .query({ type, name })
                .end((err, res) => {
                    if (res.body) {
                        this.setState({ route: res.body })
                    }
                    this.setState({ isLoading: false });
                });
        }
    }

    render() {

        const { route } = this.state;

        return (
            <Container text>
                {!route && <LoadingPlaceholder />}

                {route &&
                    <Container>
                        <Helmet>
                            <title>{'ViaDF - ' + route.title + ' - Mapa e información - ¿Cómo llegar en transporte público?'}</title>
                        </Helmet>

                        <Breadcrumb>
                            <Breadcrumb.Section link as={Link} to="/directorio">Directorio de Rutas</Breadcrumb.Section>
                            <Breadcrumb.Divider />
                            <Breadcrumb.Section link as={Link} to={route.typeLink}>{route.typeName}</Breadcrumb.Section>
                            <Breadcrumb.Divider />
                            <Breadcrumb.Section active>{route.name}</Breadcrumb.Section>
                        </Breadcrumb>

                        <h1>{route.from} - {route.to} ({route.typeName}: {route.name})</h1>

                        <Grid stackable columns={2}>
                            <Grid.Column width={10}>
                                <RouteMap pieces1={route.pieces1} pieces2={route.pieces2}></RouteMap>
                            </Grid.Column>
                            {route.stations &&
                                <Grid.Column width={6}>
                                    <h2>Estaciones de {route.name}</h2>
                                    <Table compact="very">
                                        <Table.Body>
                                            {route.stations.map(s =>
                                                <Table.Row key={s.link}>
                                                    <Table.Cell>
                                                        <Link to={s.link}>{s.name}</Link>
                                                    </Table.Cell>
                                                </Table.Row>
                                            )}
                                        </Table.Body>
                                    </Table>
                                </Grid.Column>
                            }
                            {!route.stations &&
                                <Grid.Column width={3}>
                                    <h2>Calles</h2>
                                    <Table compact="very">
                                        <Table.Body>
                                            {route.streets.map((s, i) =>
                                                <Table.Row key={i}>
                                                    <Table.Cell>
                                                        {s}
                                                    </Table.Cell>
                                                </Table.Row>
                                            )}
                                        </Table.Body>
                                    </Table>
                                </Grid.Column>
                            }
                            {!route.stations &&
                                <Grid.Column width={3}>
                                    <h2>Colonias</h2>
                                    <Table compact="very">
                                        <Table.Body>
                                            {route.colonias.map(s =>
                                                <Table.Row key={s.link}>
                                                    <Table.Cell>
                                                        <Link to={s.link}>{s.name}</Link>
                                                    </Table.Cell>
                                                </Table.Row>
                                            )}
                                        </Table.Body>
                                    </Table>
                                </Grid.Column>
                            }
                        </Grid>


                    </Container>
                }
            </Container>
        );
    }
}