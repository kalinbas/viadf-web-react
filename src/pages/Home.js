import React, { Component } from 'react'
import {
    Grid,
    Header,
    Icon,      
    Segment  
} from 'semantic-ui-react'
import {Helmet} from "react-helmet";

export default class Home extends Component {

    render() {
        return (
            <Segment basic vertical>
                <Helmet>
                    <title>ViaDF - ¿Cómo llegar en transporte público? - Ciudad de México</title>
                    <meta name="description" content="Busca conexiones de toda la red del Metro, Metrobús, Tren Ligero, Trolebús, RTP, Autobús, Microbús, Pumabús y Tren Suburbano." />
                    <meta name="keywords" content="buscador, buscar rutas, planeador, como llego, como llegar, como voy, transporte publico, mexico, distrito federal, metro, metrobus, trolebus, pesero, microbus, tren ligero,  RTP, autobus, suburbano, pumabus, por donde" />
                </Helmet>
                
                <Grid stackable centered style={{ minHeight: '400px' }}>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <Header as='h3' style={{ fontSize: '2em' }}><Icon name="bus" /> Buscar rutas</Header>
                            <p style={{ fontSize: '1.33em' }}>
                                En ViaDF podrás encontrar la mejor forma de transportarte alrededor de la Ciudad de México, utilizando las principales conexiones como: Metro, Metrobús, Tren Ligero, Trolebús, RTP, Autobús, Microbús, Mexibús, Pumabús y Tren Suburbano.
                            </p>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Header as='h3' style={{ fontSize: '2em' }}><Icon name="users" /> Colaboración</Header>
                            <p style={{ fontSize: '1.33em' }}>
                                Lamentablemente no existe una base de datos completa de las rutas del transporte público en la CDMX. Por eso en ViaDF invitamos a todos nuestros usuarios a agregar las rutas que conozcan.
                                </p>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Header as='h3' style={{ fontSize: '2em' }}><Icon name="cloud" />  Datos / API</Header>
                            <p style={{ fontSize: '1.33em' }}>
                                Decidí publicar la base de datos de ViaDF bajo la licencia Open Data Commons Attribution License, para que usen los datos en sus proyectos. Además contamos con un servicio web REST para la búsqueda de rutas.
                                 </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}