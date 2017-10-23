import React, { Component } from 'react'
import {
    Breadcrumb,
    Container,
    Table
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet";
import superagent from "superagent";
import LoadingPlaceholder from '../components/LoadingPlaceholder'

export default class ColoniaDetail extends Component {

    state = {
        colonia: null,
        isLoading: true
    }

    getEstadoSeoName() {
        return this.props.location.pathname.split('/')[2];
    }

    componentDidMount() {
        this.load(this.getEstadoSeoName(), this.props.match.params.delegacion, this.props.match.params.colonia)
    }

    load(estado, delegacion, name) {
        if (estado && delegacion && name) {
            this.setState({ isLoading: true });
            superagent.get('https://viadf.mx/service/GetColonia')
                .query({ estado, delegacion, name })
                .end((err, res) => {
                    if (res.body) {
                        this.setState({ colonia: res.body })
                    }
                    this.setState({ isLoading: false });
                });
        }
    }

    render() {

        var { colonia } = this.state;

        return (
            <Container text>
                {!colonia && <LoadingPlaceholder />}

                {colonia &&
                    <Container>
                        <Helmet>
                            <title>{'ViaDF - Transporte público en ' + colonia.name + ' (' + colonia.delegacionName + ') - ¿Cómo llegar en transporte público?'}</title>
                        </Helmet>

                        <Breadcrumb>
                            <Breadcrumb.Section link as={Link} to="/directorio">Directorio de Rutas</Breadcrumb.Section>
                            <Breadcrumb.Divider />
                            <Breadcrumb.Section link as={Link} to={colonia.estadoLink}>{colonia.estadoName}</Breadcrumb.Section>
                            <Breadcrumb.Divider />
                            <Breadcrumb.Section link as={Link} to={colonia.delegacionLink}>{colonia.delegacionName}</Breadcrumb.Section>
                            <Breadcrumb.Divider />
                            <Breadcrumb.Section active>{colonia.name}</Breadcrumb.Section>
                        </Breadcrumb>

                        <h1>Transporte público en {colonia.name}</h1>
                        <p>En esta lista puedes ver todas las rutas de transporte público que pasan por la colonia {colonia.name} en la delegación {colonia.delegacionName}.</p>
                        <Table compact="very" style={{ margin: 0 }}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Tipo</Table.HeaderCell>
                                    <Table.HeaderCell>Nombre</Table.HeaderCell>
                                    <Table.HeaderCell>Origen</Table.HeaderCell>
                                    <Table.HeaderCell>Destino</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {
                                    colonia.routes.map(r => (
                                        <Table.Row key={r.link}>
                                            <Table.Cell>{r.typeName}</Table.Cell>
                                            <Table.Cell><Link to={r.link}>{r.name}</Link></Table.Cell>
                                            <Table.Cell>{r.from}</Table.Cell>
                                            <Table.Cell>{r.to}</Table.Cell>
                                        </Table.Row>))
                                }

                            </Table.Body>
                        </Table>
                    </Container>
                }
            </Container>
        );
    }
}