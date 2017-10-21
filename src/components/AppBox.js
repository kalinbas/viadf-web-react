import React from 'react';

import {    
    Container,
    Grid   
} from 'semantic-ui-react'

export default class AppBox extends React.Component {

    render() {
        return (<Container style={{marginTop: '20px'}}>
                <Grid stackable textAlign="center">
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <a target="_blank" rel="noopener noreferrer" href="https://itunes.apple.com/mx/app/viadf/id1185840806?mt=8">
                                <img style={{ height: '60px' }} alt="Disponible en el App Store" src="/img/app-store-badge.png" />
                            </a>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <a target="_blank" rel="noopener noreferrer" href="https://play.google.com/store/apps/details?id=mx.com.viadf.app">
                                <img style={{ height: '60px' }} alt="Descargar gratuito en Google Play" src="/img/google-play-badge.png" />
                            </a>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>);
    }
}