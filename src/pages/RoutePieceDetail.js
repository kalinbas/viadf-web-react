import React, { Component } from 'react'
import {
    Breadcrumb,
    Table,
    Grid,
    Container
} from 'semantic-ui-react'

import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet";
import superagent from "superagent";

import MarkerMap from '../components/MarkerMap'
import LoadingPlaceholder from '../components/LoadingPlaceholder'


export default class RoutePieceDetail extends Component {

    state = {
        routePiece: null,
        isLoading: true
    }

    componentDidMount() {
        this.loadRoutePiece(this.props.match.params.type, this.props.match.params.route, this.props.match.params.name)
    }

    loadRoutePiece(type, route, name) {
        if (type && route && name) {
            this.setState({ isLoading: true });
            superagent.get('https://viadf.mx/service/GetRoutePiece')
                .query({ type, route, name })
                .end((err, res) => {
                    if (res.body) {
                        this.setState({ routePiece: res.body })
                        if (this.props.onSetTo) {
                            this.props.onSetTo({ name: res.body.typeName + ' ' + res.body.name, lat: res.body.lat, lng: res.body.lng })
                        }
                    }
                    this.setState({ isLoading: false });
                });
        }
    }

    render() {

        const { routePiece } = this.state;

        return (
            <Container text>
                {!routePiece && <LoadingPlaceholder />}

                {routePiece &&
                    <Container>
                        <Helmet>
                            <title>{'ViaDF - ' + routePiece.title + ' - ¿Cómo llegar en transporte público?'}</title>
                        </Helmet>

                        <Breadcrumb>
                            <Breadcrumb.Section link as={Link} to="/directorio">Directorio de Rutas</Breadcrumb.Section>
                            <Breadcrumb.Divider />
                            <Breadcrumb.Section link as={Link} to={routePiece.typeLink}>{routePiece.typeName}</Breadcrumb.Section>
                            <Breadcrumb.Divider />
                            <Breadcrumb.Section link as={Link} to={routePiece.routeLink}>{routePiece.routeName}</Breadcrumb.Section>
                            <Breadcrumb.Divider />
                            <Breadcrumb.Section active>{routePiece.name}</Breadcrumb.Section>
                        </Breadcrumb>

                        <h1>{routePiece.title}</h1>

                        <Grid stackable columns={2}>
                            <Grid.Column width={10}>
                                <MarkerMap position={{ lat: routePiece.lat, lng: routePiece.lng }} name={routePiece.title}></MarkerMap>
                                <h2>Conexiones</h2>
                                <p>De {routePiece.title} se puede cambiar a las siguientes lineas de transporte.</p>
                                <Table compact="very">
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>Nombre</Table.HeaderCell>
                                            <Table.HeaderCell>Origen</Table.HeaderCell>
                                            <Table.HeaderCell>Destino</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {routePiece.connectingRoutes.map(s =>
                                            <Table.Row key={s.link}>
                                                <Table.Cell>
                                                    <Link to={s.link}>{s.typeName} {s.name}</Link>
                                                </Table.Cell>
                                                <Table.Cell>{s.from}</Table.Cell>
                                                <Table.Cell>{s.to}</Table.Cell>
                                            </Table.Row>
                                        )}
                                    </Table.Body>
                                </Table>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <h2>Negocios</h2>
                                <p>Cerca de {routePiece.title} hay los siguientes negocios.</p>
                                <Table compact="very">
                                    <Table.Body>
                                        {routePiece.closeBusinesses.map(s =>
                                            <Table.Row key={s.link}>
                                                <Table.Cell>
                                                    <Link to={s.link}>{s.name}</Link>
                                                </Table.Cell>
                                            </Table.Row>
                                        )}
                                    </Table.Body>
                                </Table>
                            </Grid.Column>
                        </Grid>


                    </Container>
                }
            </Container>
        );
    }
}