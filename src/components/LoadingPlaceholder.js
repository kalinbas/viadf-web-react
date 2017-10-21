import React from 'react';

import {
    Container,
    Loader,
    Dimmer,
    Image
} from 'semantic-ui-react'


export default class LoadingPlaceholder extends React.Component {

    render() {
        return (
            <Container>
                <Dimmer active inverted>
                    <Loader inverted>{this.props.message || 'Cargando...'}</Loader>
                </Dimmer>
                <Image src="/img/paragraph.png" style={{ width: '100%' }} />
            </Container>
        );
    }
}