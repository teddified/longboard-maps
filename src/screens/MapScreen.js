import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper, Polyline } from 'google-maps-react'
import { aKey } from '../aKey'
import styled from 'styled-components'

const StyledButton = styled.button`
  z-index: 1;
  position: absolute;
  bottom: 10px;
  width: 200px;
  height: 40px;
  font-size: 20px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  border-style: none;
  border-radius: 20px;
`

const PopUp = styled.div`
  z-index: 1;
  width: 240px;
  height: 40px;
  background: aliceblue;
  opacity: 0.9;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  font-size: 20px;
`

export class MapScreen extends Component {
  render() {
    const google = window.google
    const { changePosition, changeMode, state } = this.props
    let wayPointCheck = false
    if (state.waypoints.length > 2) {
      wayPointCheck = true
    }

    return (
      <React.Fragment>
        <PopUp>{state.hint}</PopUp>
        <StyledButton onClick={() => changeMode()}>
          {state.addWaypoints ? 'end' : 'add waypoints'}
        </StyledButton>
        <Map
          // style={{ height: '90vh' }}
          google={this.props.google}
          onClick={(mapProps, map, event) => changePosition(event)}
          initialCenter={{
            lat: state.waypoints[0].lat,
            lng: state.waypoints[0].lng,
          }}
          zoom={14}
        >
          <Marker
            data-test-id="Start Marker"
            onClick={this.onMarkerClick}
            position={{
              lat: state.waypoints[0].lat,
              lng: state.waypoints[0].lng,
            }}
            name={'Start'}
            Title={'Start'}
            draggable={true}
          />
          <Marker
            data-test-id="End Marker"
            onClick={this.onMarkerClick}
            position={{
              lat: state.waypoints[state.waypoints.length - 1].lat,
              lng: state.waypoints[state.waypoints.length - 1].lng,
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
            path={state.waypoints}
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={2}
          />
          {wayPointCheck &&
            state.waypoints
              .slice(1, state.waypoints.length - 1)
              .map((waypoint, index) => {
                return (
                  <Marker
                    key={index}
                    position={{
                      lat: waypoint.lat,
                      lng: waypoint.lng,
                    }}
                    draggable={true}
                  />
                )
              })}
        </Map>
      </React.Fragment>
    )
  }
}

export default GoogleApiWrapper({
  // apiKey: 'AIzaSyBJs-n4MF2WGvD6q1PfEoDJw6UQKTpAhBU',
  apiKey: aKey,
})(MapScreen)
