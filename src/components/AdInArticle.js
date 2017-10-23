import React from 'react';

export default class AdInArticle extends React.Component {
    componentDidMount() {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }

    render() {
        return (
            <div className='ad'>
                <ins className="adsbygoogle"
                    style={{ display: 'block', textAlign: 'center' }}
                    data-ad-layout="in-article"
                    data-ad-format="fluid"
                    data-ad-client={'ca-pub-' + this.props.client}
                    data-ad-slot={this.props.slot}></ins>
            </div>

        );
    }
}