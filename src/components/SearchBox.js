import React, { Component } from 'react';

import PlaceInput from './PlaceInput'

import {
  Grid,
  Responsive
} from 'semantic-ui-react'

class SearchBox extends Component {

  constructor(props) {
    super(props);

    this.state = { from: null, to: null };
  }

  // update locations if outside props change
  componentWillReceiveProps(nextProps) {
    if (nextProps.from !== this.props.from) {
      this.setState({ from: nextProps.from });
    }
    if (nextProps.to !== this.props.to) {
      this.setState({ to: nextProps.to });
    }
  }

  changeFrom = (from) => {
    this.setState({ from });
    this.checkIfReady();
  }

  changeTo = (to) => {
    this.setState({ to });
    this.checkIfReady();
  }

  checkIfReady() {
    if (this.state.from && this.state.to) {
      if (this.props.onReady) {
        this.props.onReady(this.state.from, this.state.to);
      }
    }
  }

  render() {

    return (
      <div>
        <Responsive as="div" maxWidth={990}>
          <Grid verticalAlign="middle" textAlign="center" stackable>
            <Grid.Column width={8}>
              De<br />
              <PlaceInput location={this.state.from} onSelect={this.changeFrom} />
            </Grid.Column>
            <Grid.Column width={8}>
              A<br />
              <PlaceInput location={this.state.to} onSelect={this.changeTo} />
            </Grid.Column>
          </Grid>
        </Responsive>
        <Responsive as="div" minWidth={991}>
          ¿Cómo llego de <PlaceInput location={this.state.from} onSelect={this.changeFrom} /> a <PlaceInput location={this.state.to} onSelect={this.changeTo} /> ?
        </Responsive>
      </div>
    );
  }
}

export default SearchBox;