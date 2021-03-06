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
            
            // full query
            superagent.get('https://viadf.mx/service/GetTypeWithRoutes')
                .query({ name: type.toLowerCase() })
                .end((err, res) => {
                    if (res.body) {                        
                        var lists = { ...this.state.lists };
                        lists[type.toLowerCase()] = res.body;
                        this.setState({ lists });                        
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

        var self = this;

        var seoName = self.props.match.params.type ? self.props.match.params.type.toLowerCase() : null;

        var type = null;
        routes.forEach(r => {
            if (r.seoName === seoName) {
                type = r;
            }
        })
        

        var typeName = type ? type.name : null;

        return (
            <Container text>                
                <Helmet>
                    <title>{typeName ? 'Rutas de ' + typeName + ' - Ciudad de México y Estado de México | ViaDF' : 'Directorio del transporte público de la Ciudad de México y del Estado de México | ViaDF'}</title>
                    <meta name="description" content={typeName ? 'Lista de todas las rutas del ' + typeName + ' en la Ciudad de México y en el Estado de México.' : 'Directorio de las rutas y estaciones del transporte público en la Ciudad de México y del Estado de México.'} />
                    <meta name="keywords" content={(typeName ? typeName : 'directorio') + ', como llegar, como llego, lista rutas, transporte público, méxico, ciudad de méxico, cdmx, estado de méxico'} />
                </Helmet>

                <h1>{typeName ? 'Rutas de ' + typeName : 'Directorio de rutas'}</h1>
                {
                    typeName &&
                    <p>En este directorio encontrarás un listado de todas las rutas del { typeName }. Haz click en la ruta que te interesa para ver el mapa de la ruta y más información.</p>
                }                             
                {
                    !typeName &&
                    <p>En este directorio encontrarás un listado de todas las rutas del transporte público de la <Link to={'/directorio/ciudad-de-mexico'}>Ciudad de México</Link> y del <Link to={'/directorio/estado-de-mexico'}>Estado de México</Link>. Selecciona un tipo de transporte para ver la lista de las rutas.</p>
                }

                <Grid>
                    <Grid.Column width={4}>
                        <Menu fluid vertical tabular>
                            {
                                routes.map(r => <Menu.Item key={r.seoName} as={Link} to={'/directorio/' + r.seoName} content={r.name} active={seoName === r.seoName} />)
                            }
                        </Menu>
                    </Grid.Column>
                    <Grid.Column stretched width={12}>
                        {seoName &&
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
                                            this.state.lists[seoName] && this.state.lists[seoName].routes && this.state.lists[seoName].routes.map(r => (
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