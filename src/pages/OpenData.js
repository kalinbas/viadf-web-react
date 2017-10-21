import React, { Component } from 'react'
import {
    Container,
    Button,
    Icon
} from 'semantic-ui-react'
import { Helmet } from "react-helmet"

export default class OpenData extends Component {

    downloadRoutes = () => {
        window.open('/files/data/data.zip');
    }

    downloadStats = () => {
        window.open('/files/statistics/statistics.zip');
    }

    downloadStats2 = () => {
        window.open('/files/statistics/statistics2.zip');
    }

    render() {
        return (
            <Container text>
                <Helmet>
                    <title>ViaDF - Datos abiertos</title>
                </Helmet>

                <h1>Datos abiertos</h1>
                <p>
                    Me han llegado muchos correos donde preguntan por los datos de ViaDF. Por eso decidí publicar la base de datos bajo la licencia <a href="http://opendatacommons.org/licenses/by/summary/" target="_blank" rel="noopener noreferrer"><b>Open Data Commons Attribution License</b></a> para que la puedan usar en sus proyectos.
                </p>
                <p>
                    Eso significa:
                </p>
                <ul>
                    <li>Cuando usan los datos tienen que mencionar en algún lugar que los datos vienen de ViaDF.</li>
                    <li>Si logran mejorar y/o completar la base de datos, sería increíble que la publicarán otra vez como <a href="http://opendatacommons.org/licenses/by/summary/" target="_blank" rel="noopener noreferrer">Open Data</a> (eso no es mandatorio).</li>
                    <li>Por favor escríbenos un mensaje en <a href="https://www.facebook.com/ViaDF" target="_blank" rel="noopener noreferrer">nuestra página de Facebook</a>.</li>
                </ul>

                <h2>Rutas del transporte público</h2>
                <p>Este archivo contiene las rutas del transporte público de la Ciudad de México de la base de datos de ViaDF (versión del 28.04.2017).</p>
                <Button onClick={this.downloadRoutes}><Icon name='download' /> 1.6 MB</Button>

                <h2>Búsquedas realizadas del 2010 al 2015</h2>
                <p>Este archivo contiene todas las búsquedas (anónimas) de los últimos años que se realizaron a traves de ViaDF (versión del 13.07.2015).</p>
                <Button onClick={this.downloadStats}><Icon name='download' /> 67 MB</Button>

                <h2>Búsquedas realizadas del 2016 al 2017</h2>
                <p>Este archivo contiene todas las búsquedas (anónimas) de los últimos años que se realizaron a traves de ViaDF (versión del 09.08.2017).</p>
                <Button onClick={this.downloadStats2}><Icon name='download' /> 56 MB</Button>

            </Container>
        );
    }
}