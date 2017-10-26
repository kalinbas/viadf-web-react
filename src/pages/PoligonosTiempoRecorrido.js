import React, { Component } from 'react'
import {
    Container
} from 'semantic-ui-react'
import { Helmet } from "react-helmet"
import PolygonMap from "../components/PolygonMap"

export default class PoligonosTiempoRecorrido extends Component {

    render() {

        return (
            <Container text>
                <Helmet>
                    <title>Polígonos de tiempo de recorrido | ViaDF</title>
                </Helmet>

                <h1>Polígonos de tiempo de recorrido<sup>BETA</sup></h1>
                <p>El cálculo de los polígonos está todavía en desarrollo y falta mucha optimización. Por eso la búsqueda está limitada a 45 minutos.</p>

                <PolygonMap></PolygonMap>
            </Container>
        );
    }
}