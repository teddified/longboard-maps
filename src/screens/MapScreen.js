import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper, Polyline } from 'google-maps-react'
import { aKey } from '../aKey'
import styled from 'styled-components'

const { compose, withProps, lifecycle } = require('recompose')
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require('react-google-maps')

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
  transition: all 0.4s ease-in;
  outline: none;
  &:active {
    background: #1ea362;
    border: 1px solid #ddd;
  }
`
const StyledButton2 = styled.button`
  z-index: 1;
  position: absolute;
  bottom: 50px;
  width: 200px;
  height: 40px;
  font-size: 20px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  border-style: none;
  border-radius: 20px;
  transition: all 0.4s ease-in;
  outline: none;
  &:active {
    background: #1ea362;
    border: 1px solid #ddd;
  }
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
  setDirections() {
    const { updateDirections } = this.props
    const google = window.google
    const DirectionsService = new google.maps.DirectionsService()
    DirectionsService.route(
      {
        origin: new google.maps.LatLng(53.5726, 9.984783),
        destination: new google.maps.LatLng(53.561068, 9.913787),
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          updateDirections(result)
        } else {
          console.error(`error fetching directions ${result}`)
        }
      }
    )
  }

  checkStart() {
    const { state } = this.props
    if (state.waypoints[0]) {
      return {
        lat: state.waypoints[0].lat,
        lng: state.waypoints[0].lng,
      }
    } else {
      return {}
    }
  }

  checkEnd() {
    const { state } = this.props
    if (state.waypoints[state.waypoints.length - 1]) {
      return {
        lat: state.waypoints[state.waypoints.length - 1].lat,
        lng: state.waypoints[state.waypoints.length - 1].lng,
      }
    } else {
      return {}
    }
  }

  checkStartEnd() {
    const { changeMode, state } = this.props
    if (state.waypoints[0] && state.waypoints[state.waypoints.length - 1]) {
      changeMode()
    } else {
      console.log('nope')
    }
  }

  toogleClassName = () => {
    const { state } = this.props
    if (state.waypoints.length > 2) {
      return 'visible'
    } else {
      return 'hidden'
    }
  }

  render() {
    const google = window.google
    const { changePosition, state } = this.props
    let wayPointCheck = false
    if (state.waypoints.length > 2) {
      wayPointCheck = true
    }

    return (
      <React.Fragment>
        <PopUp>{state.hint}</PopUp>
        <StyledButton
          onClick={() => this.checkStartEnd()}
          style={{
            bottom: state.waypoints.length < 2 ? '-40px' : '10px',
          }}
        >
          {state.addWaypoints ? 'end' : 'add waypoints'}
        </StyledButton>

        <Map
          google={this.props.google}
          onClick={(mapProps, map, event) => changePosition(event)}
          initialCenter={{
            lat: 53.57255,
            lng: 9.98292,
          }}
          zoom={14}
        >
          <Marker
            data-test-id="Start Marker"
            onClick={this.onMarkerClick}
            position={this.checkStart()}
            name={'Start'}
            Title={'Start'}
            draggable={true}
          />
          <Marker
            data-test-id="End Marker"
            onClick={this.onMarkerClick}
            position={this.checkEnd()}
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
          <StyledButton2 onClick={() => this.setDirections()}>
            test
          </StyledButton2>
          {state.directions &&
            console.log(state.directions) && (
              <DirectionsRenderer directions={state.directions} />
            )}
        </Map>
      </React.Fragment>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: aKey,
})(MapScreen)
