import React, { Component } from 'react'

export default class RouteMap extends Component {

  map = null
  polyline1 = null
  polyline2 = null
  polylineHighlight = null

  state = {}

  componentDidMount() {
    this.initMap()
  }

  componentDidUpdate(prevProps, prevState) {
    // TODO check if arrays changed
    this.drawLines();
  }

  initMap() {

    let mapOptions = {
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      streetViewControl: false,
      mapTypeControl: false,
    };

    this.map = new window.google.maps.Map(this.refs.map, mapOptions);

    this.drawLines();
  }

  drawLines() {

    // clear existing polylines
    if (this.polyline1) {
      this.polyline1.setMap(null);
      this.polyline1 = null;
    }
    if (this.polyline2) {
      this.polyline2.setMap(null);
      this.polyline2 = null;
    }
    if (this.polylineHighlight) {
      this.polylineHighlight.setMap(null);
      this.polylineHighlight = null;
    }

    // prepare coords
    let routeCoords = this.props.pieces1.map(p => new window.google.maps.LatLng(p.lat, p.lng));
    let routeCoords2 = this.props.pieces2 ? this.props.pieces2.map(p => new window.google.maps.LatLng(p.lat, p.lng)) : null;
    let routeCoordsHighlight = this.props.highlightPieces ? this.props.highlightPieces.map(p => new window.google.maps.LatLng(p.lat, p.lng)) : null;

    let bounds = new window.google.maps.LatLngBounds();

    // highlight pieces zoom - if provided
    if (routeCoordsHighlight && routeCoordsHighlight.length > 0) {
      routeCoordsHighlight.forEach(c => {
        bounds.extend(c);
      })
    } else {
      routeCoords.forEach(c => {
        bounds.extend(c);
      })
      if (routeCoords2) {
        routeCoords2.forEach(c => {
          bounds.extend(c);
        })
      }
    }

    this.map.fitBounds(bounds);

    // create polylines
    this.polyline1 = new window.google.maps.Polyline({
      path: routeCoords,
      strokeColor: "#FF0000",
      strokeOpacity: 0.6,
      strokeWeight: 5
    });
    this.polyline1.setMap(this.map);

    if (routeCoords2) {
      this.polyline2 = new window.google.maps.Polyline({
        path: routeCoords2,
        strokeColor: "#0000FF",
        strokeOpacity: 0.6,
        strokeWeight: 5
      });
      this.polyline2.setMap(this.map);
    }

    if (routeCoordsHighlight) {
      this.polylineHighlight = new window.google.maps.Polyline({
        path: routeCoordsHighlight,
        strokeColor: "#000000",
        strokeOpacity: 1.0,
        strokeWeight: 5,
        icons: [{
          icon: { path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW },
          offset: '100%'
        }]
      });
      this.polylineHighlight.setMap(this.map);
    }
  }

  render() {
    return (
      <div ref="map" style={{ width: "100%", height: "400px" }}></div>
    );
  }
}