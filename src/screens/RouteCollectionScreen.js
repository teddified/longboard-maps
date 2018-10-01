import React, { Component } from 'react'
import { aKey } from '../aKey'

const { compose, withProps, lifecycle } = require('recompose')
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Polyline,
} = require('react-google-maps')

export default class RouteCollectionScreen extends Component {
  state = {
    trips: [
      {
        waypoints: [{ lat: 54, lng: 10 }, { lat: 53, lng: 9 }],
        tripName: 'SHORT',
        rating: {
          road: { easy: true, medium: false, hard: false },
          crowd: { easy: true, medium: false, hard: false },
          difficulty: { easy: true, medium: false, hard: false },
          gradient: { easy: true, medium: false, hard: false },
        },
        totalRating: 1,
        distance: '5 Km',
      },
      {
        waypoints: [{ lat: 54.5, lng: 10.5 }, { lat: 52.5, lng: 8.5 }],
        tripName: 'LONG',
        rating: {
          road: { easy: true, medium: false, hard: false },
          crowd: { easy: true, medium: false, hard: false },
          difficulty: { easy: true, medium: false, hard: false },
          gradient: { easy: true, medium: false, hard: false },
        },
        totalRating: 1,
        distance: '2 Km',
      },
    ],
    waypoints: [],
    StartBool: true,
    addWaypoints: false,
    hint: 'Place your Starting Point',
    directions: null,
    distance: null,
    tripName: null,
    rating: {
      road: { easy: true, medium: false, hard: false },
      crowd: { easy: true, medium: false, hard: false },
      difficulty: { easy: true, medium: false, hard: false },
      gradient: { easy: true, medium: false, hard: false },
    },
  }

  checkIntersection() {
    const { state } = this.props
    const commonPts = []
    if (state.trips.length > 1) {
      for (
        let i = 0;
        i < state.trips[0].directions.routes[0].overview_path.length;
        i++
      ) {
        for (
          let j = 0;
          j < state.trips[1].directions.routes[0].overview_path.length;
          j++
        ) {
          let factorOne = state.trips[0].directions.routes[0].overview_path[i]
            .lat()
            .toFixed(3)
          let factorTwo = state.trips[1].directions.routes[0].overview_path[j]
            .lat()
            .toFixed(3)

          if (factorOne === factorTwo) {
            commonPts.push({
              lat: state.trips[0].directions.routes[0].overview_path[i].lat(),
              lng: state.trips[0].directions.routes[0].overview_path[i].lng(),
              route1idx: i,
            })
          }
        }
      }
      if (commonPts.length > 1) {
        let path = []
        let prevIdx = commonPts[0].route1idx
        for (let i = 0; i < commonPts.length; i++) {
          if (commonPts[i].route1idx <= prevIdx + 1) {
            path.push(commonPts[i])
            prevIdx = commonPts[i].route1idx
          } else {
            return (
              <Polyline
                path={path}
                options={{ strokeColor: 'seagreen', strokeWeight: '20' }}
              />
            )
          }
        }
        return (
          <Polyline
            path={path}
            options={{ strokeColor: 'seagreen', strokeWeight: '20' }}
          />
        )
      }
    }
    // console.log(commonPts)
    // console.log(state.trips[0].directions.routes[0].overview_path[0].lat())
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
        containerElement: <div style={{ height: '100vh' }} />,
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
        }}
        data-test-id="googlemap"
        defaultCenter={{ lat: 53.572573, lng: 9.982965 }}
      >
        {this.props.state.trips.map((trip, index) => {
          return (
            <DirectionsRenderer
              key={index}
              directions={trip.directions}
              suppressMarker={true}
              options={{
                suppressMarker: true,
                polylineOptions: {
                  strokeColor: 'crimson',
                  strokeWeight: '12',
                  strokeOpacity: '0.8',
                },
              }}
            />
          )
        })}

        {this.checkIntersection()}
      </GoogleMap>
    ))
    return MapWithADirectionsRenderer
  }

  render() {
    const MapWithADirectionsRenderer = this.getMap()
    return <MapWithADirectionsRenderer />
  }
}
