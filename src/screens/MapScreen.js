import React, { Component } from 'react'
import { aKey } from '../aKey'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

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
const StyledSaveButton = styled.button`
  z-index: 1;
  position: absolute;
  bottom: 10px;
  width: 200px;
  height: 40px;
  font-size: 20px;
  left: 10px;
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
  top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  font-size: 20px;
`

const StyledDistance = styled.div`
  height: 20px;
  width: 140px;
  border-radius: 20px;
  background: aliceblue;
  position: absolute;
  left: 10px;
  top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  @media screen and (max-width: 650px) {
    top: 60px;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
  }
`

const { compose, withProps, lifecycle } = require('recompose')
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require('react-google-maps')

export default class MapScreen extends Component {
  // checkStart() {
  //   const { state } = this.props
  //   if (state.waypoints[0]) {
  //     return {
  //       lat: state.waypoints[0].lat,
  //       lng: state.waypoints[0].lng,
  //     }
  //   } else {
  //     return {}
  //   }
  // }

  // checkEnd() {
  //   const { state } = this.props
  //   if (state.waypoints[state.waypoints.length - 1]) {
  //     return {
  //       lat: state.waypoints[state.waypoints.length - 1].lat,
  //       lng: state.waypoints[state.waypoints.length - 1].lng,
  //     }
  //   } else {
  //     return {}
  //   }
  // }

  checkStartEnd() {
    const { changeMode, state } = this.props
    if (state.waypoints[0] && state.waypoints[state.waypoints.length - 1]) {
      changeMode()
    } else {
      console.log('nope')
    }
  }

  checkDistance(directions) {
    const { state } = this.props
    console.log(directions)
    if (state.waypoints.length > 2) {
      let distance = directions.routes[0].legs.reduce((acc, curr) => {
        return acc + curr.distance.value
      }, 0)
      return distance / 1000 + ' Km'
    } else {
      return directions.routes[0].legs[0].distance.text
    }
  }

  getMap() {
    const { changePosition, saveTrip, state } = this.props

    const MapWithADirectionsRenderer = compose(
      withProps({
        googleMapURL:
          'https://maps.googleapis.com/maps/api/js?key=' +
          aKey +
          '&v=3.exp&libraries=geometry,drawing,places',
        loadingElement: <div style={{ height: '100%' }} />,
        containerElement: <div style={{ height: '100vh' }} />,
        mapElement: <div style={{ height: '100%' }} />,
        state: state,
        changePosition: changePosition,
        saveTrip: saveTrip,
      }),
      withScriptjs,
      withGoogleMap,
      lifecycle({
        componentDidMount() {
          const google = window.google
          const DirectionsService = new google.maps.DirectionsService()
          const waypoints = this.props.state.waypoints

          if (waypoints.length > 1) {
            DirectionsService.route(
              {
                origin: new google.maps.LatLng(
                  waypoints[0].lat,
                  waypoints[0].lng
                ),
                destination: new google.maps.LatLng(
                  waypoints[waypoints.length - 1].lat,
                  waypoints[waypoints.length - 1].lng
                ),
                travelMode: google.maps.TravelMode.WALKING,
                waypoints: waypoints
                  .slice(1, state.waypoints.length - 1)
                  .map(waypoint => ({
                    location: new google.maps.LatLng(
                      waypoint.lat,
                      waypoint.lng
                    ),
                  })),
              },
              (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                  this.setState({
                    directions: result,
                  })
                } else {
                  console.error(`error fetching directions ${result}`)
                }
              }
            )
          }
          if (waypoints.length < 2) {
            DirectionsService.route(
              {
                origin: new google.maps.LatLng(53.572548, 9.983029),
                destination: new google.maps.LatLng(53.561082, 10),
                travelMode: google.maps.TravelMode.WALKING,
              },
              (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                  this.setState({
                    directions: result,
                  })
                } else {
                  console.error(`error fetching directions ${result}`)
                }
              }
            )
          }
        },
      })
    )(props => (
      <GoogleMap
        defaultZoom={14}
        onClick={e => this.props.changePosition(e)}
        options={{
          disableDefaultUI: true,
        }}
        data-test-id="googlemap"
      >
        <PopUp>{state.hint}</PopUp>

        <StyledButton
          data-test-id="addwaypoints"
          onClick={() => this.checkStartEnd()}
          style={{
            bottom: state.waypoints.length < 2 ? '-40px' : '10px',
          }}
        >
          {state.addWaypoints ? 'end' : 'add waypoints'}
        </StyledButton>
        <Link to="/saveTrip">
          <StyledSaveButton
            onClick={this.props.saveTrip}
            data-test-id="savetrip"
          >
            Save Trip
          </StyledSaveButton>
        </Link>
        {props.directions && (
          <React.Fragment>
            <StyledDistance data-test-id="distancelabel">
              <span>Distance: </span>
              {this.checkDistance(props.directions)}
            </StyledDistance>
            <DirectionsRenderer
              directions={props.directions}
              suppressMarkers="true"
            />
          </React.Fragment>
        )}
      </GoogleMap>
    ))
    return MapWithADirectionsRenderer
  }

  render() {
    const MapWithADirectionsRenderer = this.getMap()
    return <MapWithADirectionsRenderer />
  }
}
