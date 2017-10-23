import React, { Component } from 'react'
import {
    Accordion,    
    Container,      
    Icon,  
    Table
} from 'semantic-ui-react'
import { Helmet } from "react-helmet"

export default class Api extends Component {

    state = { activeIndex: 0 }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    render() {

        const apis = [
            {
                name: 'GET /service/search',
                description: 'Servicio web para buscar una ruta del transporte público.',
                credits: '1 Crédito',
                parameters: [
                    { name: 'de', description: 'coordenadas del inicio (ejemplo: 19.37923123,-99.10968304)' },
                    { name: 'a', description: 'coordenadas del destino (ejemplo: 19.46483212,-99.14238453)' },
                    { name: 'count', description: 'cantidad de resultados (max. 5)' },
                    { name: 'key', description: 'API key' }
                ],
                example: 'https://viadf.mx/service/search?de=19.37923123,-99.10968304&a=19.46483212,-99.14238453&count=3&key=...'
            },
            {
                name: 'GET /service/orderbytraveltime',
                description: 'Servicio web para ordenar una lista de coordenadas dependiendo de su distancia en tiempo de recorrido, de un punto de inicio.',
                credits: '2 Créditos',
                parameters: [
                    { name: 'start', description: 'coordenadas del inicio (ejemplo: 19.43255,-99.13337)' },
                    { name: 'points', description: 'lista de coordenadas (max. 100 coordenadas) (ejemplo: 19.27923,-99.13238;19.35923,-99.11238)' },
                    { name: 'type', description: '1 - caminando / 2 - transporte público' },
                    { name: 'key', description: 'API key' }
                ],
                example: 'https://viadf.mx/service/orderbytraveltime?start=19.43255,-99.13337&points=19.27923,-99.13238;19.35923,-99.11238&type=2&key=...'
            },
            {
                name: 'GET /service/getcredits',
                description: 'Servicio web para consultar los creditós restantes del API key.',
                parameters: [
                    { name: 'key', description: 'API key' }
                ],
                example: 'https://viadf.mx/service/getcredits?key=...'
            },

        ]

        const { activeIndex } = this.state

        return (
            <Container text>
                <Helmet>
                    <title>ViaDF - REST API - Servicios web</title>
                </Helmet>

                <h1>REST API - Servicios web</h1>
                <p>
                    Para usar los servicios web de ViaDF es necesario conseguir un API key. Si estás interesado en usar los servicios web en tu aplicación, por favor <a target="_blank" href="mailto:info@viadf.mx?subject=Generar API Key" rel="noopener noreferrer">contáctanos</a> y te darémos 100 créditos gratuitos para probar el servicio. También te mandaremos información de precios y planes para adquirir más créditos.
                </p>
                <h2>Servicios disponibles</h2>
                <Accordion fluid styled>
                    {apis.map((a, i) => (
                        <div key={i}>
                            <Accordion.Title active={activeIndex === i} index={i} onClick={this.handleClick}>                                
                                <h3><Icon name='dropdown' />{a.name}</h3>
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === i}>
                                <p>{a.description}</p>
                                { a.credits && <p><b>{a.credits}</b></p> }
                                <h4>Parámetros</h4>
                                <Table definition>
                                    <Table.Body>
                                        {a.parameters.map((p, i) => (<Table.Row key={i}>
                                            <Table.Cell>{p.name}</Table.Cell>
                                            <Table.Cell style={{ wordBreak:'break-all' }}>{p.description}</Table.Cell>
                                        </Table.Row>))}
                                    </Table.Body>
                                </Table>
                                <h4>Ejemplo</h4>
                                <a href={a.example} style={{ wordBreak:'break-all' }}>{a.example}</a>
                            </Accordion.Content>
                        </div>
                    ))}
                </Accordion>
            </Container>
        );
    }
}