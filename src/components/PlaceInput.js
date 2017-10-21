import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByPlaceId } from 'react-places-autocomplete'

class PlaceInput extends Component {

  constructor(props) {
    super(props);

    this.state = { address: this.props.location ? this.props.location.name : '' };
  }

  componentWillReceiveProps(nextProps) {
    // if location changed outside
    if (nextProps.location && (!this.props.location || nextProps.location.name !== this.props.location.name)) {
      this.setState({ address: nextProps.location.name });
    }
  }

  onChange = (address) => {
    this.setState({ address });
    if (this.props.onSelect) {
      this.props.onSelect(null);
    }
  };

  handleSelect = (address, placeId) => {
    this.setState({ address });
    geocodeByPlaceId(placeId).then(this.handleGoogleResponse);
  };

  handleGoogleResponse = (res) => {
    if (this.props.onSelect) {
      this.props.onSelect({ name: this.state.address, lat: res[0].geometry.location.lat(), lng: res[0].geometry.location.lng()});
    }
  };

  render() {

    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }

    return (
      <div className="ui search" style={{ display: 'inline-block', marginLeft: '5px', marginRight: '5px' }}>
        <div className="ui icon input">
          <PlacesAutocomplete
            inputProps={inputProps}
            onSelect={this.handleSelect}
            classNames={{ input: 'prompt placeInput' }}
            styles={{ autocompleteContainer: { zIndex: 100 }}}
            options={{
              componentRestrictions: {
                country: 'MX'
              }
            }} />
          <i className="search icon"></i>
        </div>
      </div>

    );
  }
}

export default PlaceInput;
