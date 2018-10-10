import React, { Component } from 'react'
import { aKey } from '../aKey'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const StyledApp = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100vh;
`

const StyledHeader = styled.div`
  background: #343a40;
  width: 100%;
  height: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  color: white;
`

const StyledMapWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 82%;
`

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

  @media screen and (max-width: 680px) {
    bottom: 60px;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
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
  @media screen and (max-width: 680px) {
    bottom: 10px;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
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
        containerElement: <div style={{ height: '100%' }} />,
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
          styles: [
            {
              elementType: 'geometry',
              stylers: [
                {
                  color: '#212121',
                },
              ],
            },
            {
              elementType: 'labels.icon',
              stylers: [
                {
                  visibility: 'off',
                },
              ],
            },
            {
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#757575',
                },
              ],
            },
            {
              elementType: 'labels.text.stroke',
              stylers: [
                {
                  color: '#212121',
                },
              ],
            },
            {
              featureType: 'administrative',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#757575',
                },
                {
                  visibility: 'off',
                },
              ],
            },
            {
              featureType: 'administrative.country',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#9e9e9e',
                },
              ],
            },
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#bdbdbd',
                },
              ],
            },
            {
              featureType: 'poi',
              stylers: [
                {
                  visibility: 'off',
                },
              ],
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#757575',
                },
              ],
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#181818',
                },
              ],
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry.fill',
              stylers: [
                {
                  color: '#093b07',
                },
                {
                  visibility: 'on',
                },
              ],
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#616161',
                },
              ],
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.stroke',
              stylers: [
                {
                  color: '#1b1b1b',
                },
              ],
            },
            {
              featureType: 'road',
              elementType: 'geometry.fill',
              stylers: [
                {
                  color: '#4a4a4a',
                },
              ],
            },
            {
              featureType: 'road',
              elementType: 'labels.icon',
              stylers: [
                {
                  visibility: 'off',
                },
              ],
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#8a8a8a',
                },
              ],
            },
            {
              featureType: 'road.arterial',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#373737',
                },
              ],
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#3c3c3c',
                },
              ],
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.fill',
              stylers: [
                {
                  color: '#b60b08',
                },
              ],
            },
            {
              featureType: 'road.highway.controlled_access',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#4e4e4e',
                },
              ],
            },
            {
              featureType: 'road.highway.controlled_access',
              elementType: 'geometry.fill',
              stylers: [
                {
                  color: '#ff0000',
                },
              ],
            },
            {
              featureType: 'road.local',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#616161',
                },
              ],
            },
            {
              featureType: 'transit',
              stylers: [
                {
                  visibility: 'off',
                },
              ],
            },
            {
              featureType: 'transit',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#757575',
                },
              ],
            },
            {
              featureType: 'transit.line',
              elementType: 'geometry.fill',
              stylers: [
                {
                  color: '#4c8076',
                },
              ],
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#000000',
                },
              ],
            },
            {
              featureType: 'water',
              elementType: 'geometry.fill',
              stylers: [
                {
                  color: '#095f8d',
                },
              ],
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#3d3d3d',
                },
              ],
            },
          ],
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
                options={
                  {
                    // draggable: true,
                  }
                }
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
    return (
      <React.Fragment>
        <StyledApp>
          <StyledHeader>Add Route</StyledHeader>
          <StyledWrapper>
            <StyledMapWrapper>
              <MapWithADirectionsRenderer />
            </StyledMapWrapper>
          </StyledWrapper>
          <Navbar navHeight={'10%'} />
        </StyledApp>
      </React.Fragment>
    )
  }
}
