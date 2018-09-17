import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper, Polyline } from 'google-maps-react'
import { aKey } from '../aKey'

export class MapScreen extends Component {
  render() {
    const google = window.google
    const { changePosition, state } = this.props
    const triangleCoords = [
      { lat: state.markerStart.lat, lng: state.markerStart.lng },
      { lat: state.markerEnd.lat, lng: state.markerEnd.lng },
    ]
    return (
      <Map
        google={this.props.google}
        onClick={(...props) => changePosition(props)}
        initialCenter={{
          lat: state.markerStart.lat,
          lng: state.markerStart.lng,
        }}
        zoom={14}
      >
        <Marker
          onClick={this.onMarkerClick}
          position={{
            lat: state.markerStart.lat,
            lng: state.markerStart.lng,
          }}
          name={'Start'}
          Title={'Start'}
          draggable={true}
        />
        <Marker
          onClick={this.onMarkerClick}
          position={{
            lat: state.markerEnd.lat,
            lng: state.markerEnd.lng,
          }}
          name={'Finish'}
          Title={'Finish'}
          draggable={true}
          icon={{
            url:
              'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
            anchor: new google.maps.Point(0, 32),
            scaledSize: new google.maps.Size(32, 32),
          }}
        />
        <Polyline
          path={triangleCoords}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2}
        />
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  // apiKey: 'AIzaSyBJs-n4MF2WGvD6q1PfEoDJw6UQKTpAhBU',
  apiKey: aKey,
})(MapScreen)
