import React, { Component } from 'react'
import {
    Button,
    Container,
    Grid,
    Header,
    Icon,
    List,
    Menu,
    Segment,
    Sidebar,
    Responsive
} from 'semantic-ui-react'

import { Link, NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom';

import Routes from './Routes'

import SearchBox from './components/SearchBox'
import AppBox from './components/AppBox'
import Ad from './components/Ad'
import AdInArticle from './components/AdInArticle'

import Helmet from 'react-helmet'

var ReactGA = require('react-ga');
ReactGA.initialize('UA-31477494-1');

class Layout extends Component {

    // filled by ref
    contentAnchor = null;

    constructor(props) {
        super(props);

        this.state = { from: null, to: null };

        this.props.history.listen(this.logPageView);

        this.logPageView(window.location);
    }

    logPageView = (location) => {
        let fullPath = location.pathname + location.search
        ReactGA.set({ page: fullPath });
        ReactGA.pageview(fullPath);

        this.scrollToContent();
    }

    registerContentAnchor = (anchor) => {
        this.contentAnchor = anchor;
    }

    changeFrom = (from) => {
        this.setState({ from });
    }

    changeTo = (to) => {
        this.setState({ to });
    }

    doSearch = (from, to) => {
        const origen = encodeURIComponent(from.name.split(',')[0]);
        const destino = encodeURIComponent(to.name.split(',')[0]);

        this.props.history.push("/busqueda?de=" + from.lat + "," + from.lng + "&a=" + to.lat + "," + to.lng + "&origen=" + origen + "&destino=" + destino)
        this.scrollToContent();
    }

    openFacebook = () => window.open('https://www.facebook.com/ViaDF')
    openTwitter = () => window.open('https://twitter.com/viadf')
    openGithub = () => window.open('https://github.com/kalinbas/viadf')

    toggleSideBar = (e) => {
        this.setState(prevState => { return { sidebar: !prevState.sidebar } });
        e.stopPropagation();
    }

    hideSideBarAndScrollToContent = () => {
        this.hideSideBar();
        this.scrollToContent();
    }

    hideSideBar = () => this.setState({ sidebar: false })

    scrollToContent = () => {
        if (this.contentAnchor) {
            this.contentAnchor.scrollIntoView()
        }
    }

    render() {
        const { sidebar } = this.state

        // create lower case canonical url (without query string)
        let canonical = window.location.href;
        if (canonical) {
            var index = canonical.indexOf('?');
            if (index > 0) {
                canonical = canonical.substr(0, index).toLowerCase() + canonical.substr(index);
            } else {
                canonical = canonical.toLowerCase();
            }
        }

        return (
            <div>
                { canonical &&
                    <Helmet>
                        <link rel="canonical" href={canonical} />
                    </Helmet>
                }
                <Sidebar.Pushable as={Segment} basic>
                    <Sidebar as={Menu} animation='overlay' visible={sidebar} icon='labeled' vertical inverted width="thin">
                        <Menu.Item exact as={NavLink} to="/" onClick={this.hideSideBarAndScrollToContent}>
                            <Icon name="bus" size="big" inverted style={{ margin: '20px' }} />
                            <div style={{ fontSize: '30px', color: 'white', marginBottom: '10px' }}>ViaDF</div>
                        </Menu.Item>
                        <Menu.Item exact as={NavLink} to="/directorio" onClick={this.hideSideBarAndScrollToContent}>Directorio de Rutas</Menu.Item>
                        <Menu.Item exact as={NavLink} to="/opendata" onClick={this.hideSideBarAndScrollToContent}>Datos abiertos</Menu.Item>
                        <Menu.Item exact as={NavLink} to="/api" onClick={this.hideSideBarAndScrollToContent}>REST API</Menu.Item>
                        <Menu.Item exact as={NavLink} to="/poligonostiemporecorrido" onClick={this.hideSideBarAndScrollToContent}>Polígonos</Menu.Item>
                        <Menu.Item>
                            <Menu.Menu widths={3}>
                                <Menu.Item icon='facebook' onClick={this.openFacebook}>
                                </Menu.Item>
                                <Menu.Item icon='twitter' onClick={this.openTwitter}>
                                </Menu.Item>
                                <Menu.Item icon='github' onClick={this.openGithub}>
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu.Item>
                    </Sidebar>
                    <Sidebar.Pusher dimmed={sidebar} onClick={this.hideSideBar}>
                        <Segment
                            inverted
                            textAlign='center'
                            style={{ padding: '1em 0em', backgroundImage: 'url("/img/header.jpg")', backgroundSize: 'cover', backgroundPosition: 'bottom ' }}
                            vertical
                        >
                            <Container>
                                <Responsive as={Menu} minWidth={767} inverted pointing secondary size='large'>
                                    <Menu.Item exact as={NavLink} to="/">Inicio</Menu.Item>
                                    <Menu.Item exact as={NavLink} to="/directorio">Directorio de Rutas</Menu.Item>
                                    <Menu.Item exact as={NavLink} to="/opendata">Datos abiertos</Menu.Item>
                                    <Menu.Item exact as={NavLink} to="/api">REST API</Menu.Item>
                                    <Menu.Item exact as={NavLink} to="/poligonostiemporecorrido">Polígonos</Menu.Item>
                                    <Menu.Menu position='right'>
                                        <Menu.Item onClick={this.openFacebook}>
                                            <Button icon color='facebook'>
                                                <Icon name='facebook' />
                                            </Button>
                                        </Menu.Item>
                                        <Menu.Item onClick={this.openTwitter}>
                                            <Button icon color='twitter'>
                                                <Icon name='twitter' />
                                            </Button>
                                        </Menu.Item>
                                        <Menu.Item onClick={this.openGithub}>
                                            <Button icon color='black'>
                                                <Icon name='github' />
                                            </Button>
                                        </Menu.Item>
                                    </Menu.Menu>
                                </Responsive>
                                <Responsive as={Menu} maxWidth={767} inverted pointing secondary size='large' onUpdate={this.hideSideBar}>
                                    <Menu.Item as='a' onClick={this.toggleSideBar}>
                                        <Icon name='bars' />
                                    </Menu.Item>
                                </Responsive>
                            </Container>

                            <Container>
                                <Header
                                    as='h1'
                                    content='ViaDF'
                                    inverted
                                    style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: 0 }}
                                />
                                <Header
                                    as='h2'
                                    content='Buscador del Transporte Público - Ciudad de México'
                                    inverted
                                    style={{ fontSize: '1.7em', fontWeight: 'normal', marginTop: '0.25em' }}
                                />
                                <div style={{ fontSize: '1.4em', margin: '0.5em 0' }}>
                                    <SearchBox from={this.state.from} to={this.state.to} onReady={this.doSearch.bind(this)}></SearchBox>
                                </div>
                                <Link style={{ color: 'white' }} to="/Busqueda?de=19.43255865356213%2C-99.13337157141115&a=19.334422%2C-99.18811&origen=Z%C3%B3calo&destino=Ciudad%20Universitaria%20(UNAM)">Ver ejemplo: ¿Cómo llegar del <strong>Zócalo</strong> a <strong>Ciudad Universitaria (UNAM)</strong>?</Link>
                            </Container>
                        </Segment>

                        <div>
                            <div ref={this.registerContentAnchor} />
                            {this.props.hasAds &&
                                <Container style={{ paddingBottom: '2em' }}>
                                    <AdInArticle client={'2461827238480440'} slot={'5759138194'} ></AdInArticle>
                                    {/*<Ad client={'2461827238480440'} slot={'6254948050'} ></Ad>*/}
                                </Container>
                            }
                            <Responsive as={Container} maxWidth={974}>
                                <Routes onSetFrom={this.changeFrom} onSetTo={this.changeTo}></Routes>
                                <AppBox />
                                {this.props.hasAds &&
                                    <Container style={{ paddingTop: '2em' }}>
                                        <AdInArticle client={'2461827238480440'} slot={'6406839601'} ></AdInArticle>
                                        {/*<Ad client={'2461827238480440'} slot={'9987143659'} ></Ad>*/}
                                    </Container>
                                }
                            </Responsive>
                            <Responsive as={Container} minWidth={975}>
                                <Grid>
                                    <Grid.Row columns={false ? 2 : 1}>
                                        <Grid.Column width={false ? 13 : 16}>
                                            <Routes onSetFrom={this.changeFrom} onSetTo={this.changeTo} ></Routes>
                                            <AppBox />
                                            {this.props.hasAds &&
                                                <Container style={{ paddingTop: '2em' }}>
                                                    <AdInArticle client={'2461827238480440'} slot={'6406839601'} ></AdInArticle>
                                                    {/*<Ad client={'2461827238480440'} slot={'9987143659'} ></Ad>*/}
                                                </Container>
                                            }
                                        </Grid.Column>
                                        {false &&
                                            <Grid.Column width={3}>
                                                <Ad client={'2461827238480440'} slot={'8069522056'} ></Ad>
                                            </Grid.Column>
                                        }
                                    </Grid.Row>
                                </Grid>
                            </Responsive>
                        </div>

                        <Segment inverted vertical style={{ padding: '3em 0em', backgroundImage: 'url("/img/footer.jpg")', backgroundSize: 'cover', backgroundPosition: 'top ' }}>
                            <Container>
                                <Grid divided inverted stackable>
                                    <Grid.Row>
                                        <Grid.Column width={3}>
                                            <Header inverted as='h4' content='Links' />
                                            <List link inverted>
                                                <List.Item as={NavLink} to="/privacidad">Privacidad</List.Item>
                                                <List.Item as={NavLink} to="/condiciones">Condiciones de uso</List.Item>
                                                <List.Item as="a" target="_blank" href="mailto:info@viadf.mx?subject=Contacto">Contacto</List.Item>
                                            </List>
                                        </Grid.Column>
                                        <Grid.Column width={10}>
                                            <Header as='h4' inverted>Acerca de ViaDF</Header>
                                            <p>ViaDF es un proyecto personal que he hecho en mi tiempo libre. Por eso estoy feliz por todo tipo de comentarios, sugerencias y ayuda. Agradezco mucho su interés en ViaDF. Gracias también al proyecto Mapatón por su esfuerzo y sus datos.</p>
                                            <p>Hecho con cariño en México y Suiza - 2017</p>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Container>
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>


            </div>
        )
    }
}

export default withRouter(Layout);