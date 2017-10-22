import React, { Component } from 'react'
import {
    Table,
    Container,
    Grid  
} from 'semantic-ui-react'

import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet";
import superagent from "superagent";

import MarkerMap from '../components/MarkerMap'
import LoadingPlaceholder from '../components/LoadingPlaceholder'


export default class BusinessDetail extends Component {

    state = {
        business: null,
        isLoading: true
    }

    componentDidMount() {
        this.loadNegocio(this.props.match.params.name, this.props.match.params.id)
    }

    componentWillReceiveProps(nextProps) {
        // if type changed   
        if (nextProps.match.params.id !== this.props.match.params.id) {
            this.loadNegocio(nextProps.match.params.name, nextProps.match.params.id)
        }
    }

    loadNegocio(name, id) {
        if (name && id) {
            // quick fix for broken seonames
            name = name.replace('ñ', 'n')
            this.setState({ isLoading: true });
            superagent.get('https://viadf.mx/service/GetBusiness')
                .query({ name, id })
                .end((err, res) => {
                    if (res.body) {
                        this.setState({ business: res.body })

                        // set to on layout
                        if (this.props.onSetTo) {
                            this.props.onSetTo({ name: res.body.name, lat: res.body.lat, lng: res.body.lng })
                        }
                    }
                    this.setState({ isLoading: false });
                });
        }
    }

    render() {

        const { business } = this.state;

        return (
            <Container text>
                { !business && <LoadingPlaceholder /> }

                {business &&
                    <Container>
                        <Helmet>
                            <title>{'ViaDF - ' + business.name + ' - ¿Cómo llegar en transporte público?'}</title>
                            <meta name="description" content={ 'Cómo llegar a ' + business.name + " (" + business.category + ")" + (business.colonia ? " en " + business.colonia + ", " + business.delegacion : "" ) +  " usando transporte público"} />
                        </Helmet>

                        <h1>{business.name}</h1>
                        <p>{business.category} {business.colonia ? " en " + business.colonia + ", " + business.delegacion : "" }</p>

                        <Grid stackable columns={2}>
                            <Grid.Column width={10}>
                                <MarkerMap position={{ lat: business.lat, lng: business.lng }} name={business.name}></MarkerMap>
                                <h2>Negocios</h2>
                                <p>Cerca de {business.name} hay los siguientes negocios.</p>
                                <Table compact="very">
                                    <Table.Body>
                                        {business.closeBusinesses.map(s =>
                                            <Table.Row key={s.link}>
                                                <Table.Cell>
                                                    <Link to={s.link}>{s.name}</Link>
                                                </Table.Cell>
                                            </Table.Row>
                                        )}
                                    </Table.Body>
                                </Table>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <h2>Conexiones</h2>
                                <p>De {business.name} se puede cambiar a las siguientes lineas de transporte.</p>
                                <Table compact="very">
                                    <Table.Body>
                                        {business.connectingRoutes.map(s =>
                                            <Table.Row key={s.link}>
                                                <Table.Cell>
                                                    <Link to={s.link}>{s.typeName} {s.name}</Link>
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