import React, { Component } from 'react'
import { aKey } from '../aKey'
import styled from 'styled-components'
import Navbar from '../components/Navbar'

const StyledApp = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100vh;
  /* display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column; */
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

const { compose, withProps, lifecycle } = require('recompose')
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Polyline,
} = require('react-google-maps')

export default class RouteCollectionScreen extends Component {
  checkIntersection() {
    const { state } = this.props
    this.commonPts = []
    let round = -1
    if (state.trips.length > 1) {
      for (let x = 0; x < state.trips.length; x++) {
        for (let y = 0; y < state.trips.length; y++) {
          if (x < y) {
            let first = true
            for (let i = 0; i < state.trips[x].polyline.length; i++) {
              for (let j = 0; j < state.trips[y].polyline.length; j++) {
                let latOne = state.trips[x].polyline[i].lat.toFixed(3)
                let lngOne = state.trips[x].polyline[i].lng.toFixed(3)
                let latTwo = state.trips[y].polyline[j].lat.toFixed(3)
                let lngTwo = state.trips[y].polyline[j].lng.toFixed(3)

                if (latOne === latTwo && lngOne === lngTwo) {
                  if (first) {
                    this.commonPts.push([
                      {
                        lat: Number(state.trips[x].polyline[i].lat),
                        lng: state.trips[x].polyline[i].lng,
                        rating:
                          (state.trips[x].totalRating +
                            state.trips[y].totalRating) /
                          2,
                      },
                    ])
                    first = false
                    round = round + 1
                  } else {
                    this.commonPts[round].push({
                      lat: state.trips[x].polyline[i].lat,
                      lng: state.trips[x].polyline[i].lng,
                    })
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  getMap() {
    const google = window.google
    const { state } = this.props
    const MapWithADirectionsRenderer = compose(
      withProps({
        googleMapURL:
          'https://maps.googleapis.com/maps/api/js?key=' +
          aKey +
          '&v=3.exp&libraries=geometry,drawing,places',
        loadingElement: <div style={{ height: '100%' }} />,
        containerElement: (
          <div
            style={{
              height: '100%',
            }}
          />
        ),
        mapElement: <div style={{ height: '100%' }} />,
        google: google,
        state: state,
      }),
      withScriptjs,
      withGoogleMap,
      lifecycle({
        componentDidMount() {},
      })
    )(props => (
      <GoogleMap
        defaultZoom={14}
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
        {this.checkIntersection()}
        {this.commonPts
          ? this.commonPts.map((route, index) => {
              let color
              switch (Math.round(route[0].rating)) {
                case 1:
                  color = 'green'
                  break
                case 2:
                  color = 'yellow'
                  break
                case 3:
                  color = 'red'
                  break
                default:
                  color = 'green'
                  break
              }
              return (
                <Polyline
                  key={index}
                  path={route}
                  options={{ strokeColor: color, strokeWeight: '4' }}
                />
              )
            })
          : console.log('nope')}
      </GoogleMap>
    ))
    return MapWithADirectionsRenderer
  }

  render() {
    const MapWithADirectionsRenderer = this.getMap()
    return (
      <React.Fragment>
        <StyledApp>
          <StyledHeader>City Overview</StyledHeader>
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
