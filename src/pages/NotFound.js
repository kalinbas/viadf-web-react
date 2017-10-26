import React, { Component } from 'react'
import {
    Icon,
    Container,
    Grid
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet";

export default class Home extends Component {

    render() {
        return (
            <Container text>
                <Helmet>
                    <title>Página no encontrada | ViaDF</title>
                </Helmet>

                <h1>404 - Página no encontrada</h1>
                <p>Parece que la página que buscas no existe. Lo sentimos. Podría ser por alguna de estas causas:</p>
                <Grid relaxed columns={3} textAlign="center" style={{margin:'20px 0'}}>
                    <Grid.Column>
                        <Icon name="help" size="big" /><br />
                        Que hayas tecleado incorrectamente la dirección URL.
                    </Grid.Column>
                    <Grid.Column>
                    <Icon name="help" size="big" /><br />
                        Que hayas perdido tu conexión a internet.
                    </Grid.Column>
                    <Grid.Column>
                    <Icon name="help" size="big" /><br />
                        Que la página esté obsoleta y haya sido eliminada.
                    </Grid.Column>                  
                </Grid>
                <p>Navega a través de nuestro menú superior a otra página dentro de nuestra web o haz click aquí para volver al <Link to="/">Inicio</Link>.</p>
            </Container>
        );
    }
}