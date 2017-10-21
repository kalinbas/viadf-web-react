import React, { Component } from 'react'

export default class MarkerMap extends Component {

  map = null
  marker = null

  state = {  }

  componentDidMount() {
    this.initMap()
  }

  initMap() {

    var position = new window.google.maps.LatLng(this.props.position.lat,this.props.position.lng);
    var mapOptions = {
        center: position,
        zoom: 16,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        streetViewControl: false,
        mapTypeControl: false,
    };

    this.map = new window.google.maps.Map(this.refs.map, mapOptions);   
    this.marker = new window.google.maps.Marker({
        position: position,
        map: this.map,
        title: this.props.name
    });
  }

  render() {
    return (
      <div ref="map" style={{ width: "100%", height: "400px" }}></div>
    );
  }
}