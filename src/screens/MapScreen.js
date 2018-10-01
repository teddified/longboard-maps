import React, { Component } from 'react'
import { aKey } from '../aKey'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

// const StyledApp = styled.div`
//   margin: 0 auto;
//   width: 320px;
//   height: 673px;
//   background: #f7f7f7;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   flex-direction: column;
//   overflow: hidden;
// `

const AddWaypointsButton = styled.button`
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
  height: 30px;
  width: 200px;
  border-radius: 20px;
  background: aliceblue;
  position: absolute;
  left: 10px;
  top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  @media screen and (max-width: 680px) {
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
  Marker,
} = require('react-google-maps')

export default class MapScreen extends Component {
  state = {
    markerLat: null,
    markerLng: null,
    firstRun: true,
  }

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
    if (state.waypoints.length > 2) {
      let distance = directions.routes[0].legs.reduce((acc, curr) => {
        return acc + curr.distance.value
      }, 0)
      return distance / 1000 + ' Km'
    } else {
      return directions.routes[0].legs[0].distance.text
    }
  }

  setAMarker(event) {
    const { state } = this.props
    if (state.waypoints.length < 2) {
      let markerLat = event.latLng.lat()
      let markerLng = event.latLng.lng()

      this.setState({
        markerLat: markerLat,
        markerLng: markerLng,
      })
    }
  }

  getMap() {
    const google = window.google
    const { changePosition, updateDistance, saveDirections, state } = this.props
    const MapWithADirectionsRenderer = compose(
      withProps({
        googleMapURL:
          'https://maps.googleapis.com/maps/api/js?key=' +
          aKey +
          '&v=3.exp&libraries=geometry,drawing,places',
        loadingElement: <div style={{ height: '100%' }} />,
        containerElement: <div style={{ height: '100vh' }} />,
        mapElement: <div style={{ height: '100%' }} />,
        google: google,
        state: state,
        changePosition: changePosition,
        updateDistance: updateDistance,
        saveDirections: saveDirections,
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
        },
      })
    )(props => (
      <GoogleMap
        defaultZoom={14}
        onClick={e => this.props.changePosition(e) && this.setAMarker(e)}
        options={{
          disableDefaultUI: true,
        }}
        data-test-id="googlemap"
        defaultCenter={{ lat: 53.572573, lng: 9.982965 }}
      >
        <PopUp>{state.hint}</PopUp>
        <AddWaypointsButton
          data-test-id="addwaypoints"
          onClick={() => this.checkStartEnd()}
          style={{
            visibility: state.waypoints.length < 2 ? 'hidden' : 'visible',
          }}
        >
          {state.addWaypoints ? 'set Start/Goal' : 'add waypoints'}
        </AddWaypointsButton>
        <Link to="/saveTrip">
          <StyledSaveButton
            disabled={state.waypoints.length > 1 ? false : true}
            data-test-id="savetrip"
            onClick={() =>
              props.updateDistance(props.directions) &&
              props.saveDirections(props.directions)
            }
          >
            Save Trip
          </StyledSaveButton>
          {this.state.markerLat &&
            this.state.markerLng &&
            state.waypoints.length < 2 && (
              <Marker
                position={{
                  lat: this.state.markerLat,
                  lng: this.state.markerLng,
                }}
              />
            )}
        </Link>
        {props.directions &&
          state.waypoints.length > 1 && (
            <React.Fragment>
              <StyledDistance data-test-id="distancelabel">
                <span>Distance: </span>
                {this.checkDistance(props.directions)}
              </StyledDistance>
              <DirectionsRenderer
                directions={props.directions}
                options={{
                  draggable: true,
                }}
              />
              <DirectionsRenderer
                directions={props.directions}
                options={{
                  draggable: true,
                }}
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
