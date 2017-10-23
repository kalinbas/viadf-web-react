import React, { Component } from 'react'

import {
  Dimmer,
  Segment,
  Loader,
  Dropdown
} from 'semantic-ui-react'

import superagent from 'superagent'

export default class PolygonMap extends Component {

  map = null
  marker = null
  overlays = [];

  state = { isLoading: true, time: '30', type: '2' }

  componentDidMount() {
    if (window.google && window.google.maps) {
      this.initMap()
    } else {
      window.addEventListener("googleMapsLoaded", this.initMap);
    }
  }


  initMap() {

    var startPosition = new window.google.maps.LatLng(19.43255, -99.13337);

    var mapOptions = {
      center: startPosition,
      zoom: 14,
      draggableCursor: 'pointer'
    };
    this.map = new window.google.maps.Map(this.refs.map,
      mapOptions);

    this.marker = new window.google.maps.Marker({
      position: startPosition,
      map: this.map,
      draggable: true
    });

    window.google.maps.event.addListener(this.marker, 'dragend', this.reload);
    window.google.maps.event.addListener(this.map, "click", this.reloadAndSetPosition);

    this.reload(true);
  }

  lockUI() {
    this.marker.setDraggable(false);
    this.setState({ isLoading: true });
  }

  unlockUI() {
    this.marker.setDraggable(true);
    this.setState({ isLoading: false });
  }


  isLockedUI() {
    return this.state.isLoading;
  }


  onChangeType = (event, data) => {
    this.setState({ type: data.value }, this.reload);
  }

  onChangeTime = (event, data) => {
    this.setState({ time: data.value }, this.reload);
  }

  reloadAndSetPosition = (event) => {
    if (!this.isLockedUI()) {
      this.marker.setPosition(event.latLng);
      this.reload();
    }
  }

  reload = (force) => {
    if (!this.isLockedUI() || force) {
      this.lockUI();
      this.recalculate();
    }
  }

  render() {

    return (
      <Dimmer.Dimmable as={Segment} dimmed={this.state.isLoading} raised textAlign="center">
        <Dimmer active={this.state.isLoading} inverted>
          <Loader>Cargando datos...</Loader>
        </Dimmer>
        <h2 style={{ margin: '0 0 10px 0' }}>
          ¿ A dónde llego{' '}
          <Dropdown inline value={this.state.type} onChange={this.onChangeType} options={[{ value: '2', text: 'en transporte público' }, { value: '1', text: 'caminando' }]} />
          en{' '}
          <Dropdown inline value={this.state.time} onChange={this.onChangeTime} options={[{ value: '10', text: '10 minutos' }, { value: '15', text: '15 minutos' }, { value: '20', text: '20 minutos' }, { value: '25', text: '25 minutos' }, { value: '30', text: '30 minutos' }, { value: '35', text: '35 minutos' }, { value: '40', text: '40 minutos' }, { value: '45', text: '45 minutos' }]} />
          ?
          </h2>
        <div ref="map" style={{ width: "100%", height: "600px" }}></div>
      </Dimmer.Dimmable>
    );
  }

  recalculate() {

    var point = this.marker.getPosition();
    this.map.panTo(point);

    this.deleteOverlays();
    var timeValue = this.state.time;
    var typeValue = this.state.type;

    superagent
      .get("https://viadf.mx/service/traveltimepolygon")
      .query({ start: point.lat() + "," + point.lng(), time: timeValue, type: typeValue, key: '0NSlW6dbj57EoyH3i0yQ3yI575kI8mb4' })
      .end((err, res) => {
        var bounds = new window.google.maps.LatLngBounds();

        var paths = [];
        res.body.Paths.forEach((path) => {
          var coords = [];
          for (var i = 0; i < path.Coords.length; i++) {
            coords[i] = new window.google.maps.LatLng(path.Coords[i].Lat, path.Coords[i].Lng);
            bounds.extend(coords[i]);
          }
          paths.push(coords);
        });

        var polygonOverlay = this.createPolygon(paths);

        this.map.fitBounds(bounds);
        //map.setZoom(map.getBoundsZoomLevel(bounds));

        this.overlays.push(polygonOverlay);

        this.unlockUI();
      });
  }

  deleteOverlays() {
    if (this.overlays) {
      for (var i in this.overlays) {
        this.overlays[i].setMap(null);
      }
      this.overlays.length = 0;
    }
  }

  createPolygon(paths) {
    return new window.google.maps.Polygon({
      paths: paths,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: this.map,
      clickable: false
    });
  }
}