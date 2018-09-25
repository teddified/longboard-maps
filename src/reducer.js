// import { load } from './services'
import ACTIONS from './actions'

const initialState = {
  trips: [],
  waypoints: [],
  StartBool: true,
  addWaypoints: false,
  hint: 'Place your Starting Point',
  directions: null,
  distance: null,
}

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case ACTIONS.CHANGE_POSITION:
      const event = action.payload
      let markerLat = event.latLng.lat()
      let markerLng = event.latLng.lng()
      if (state.addWaypoints) {
        return {
          ...state,
          waypoints: [
            ...state.waypoints.slice(0, state.waypoints.length - 1),
            { lat: markerLat, lng: markerLng },
            ...state.waypoints.slice(state.waypoints.length - 1),
          ],
          // distance: action.payload.routes[0].legs[0].distance.text,
        }
      } else {
        if (state.StartBool) {
          return {
            ...state,
            waypoints: [
              { lat: markerLat, lng: markerLng },
              ...state.waypoints.slice(1),
            ],
            StartBool: false,
            hint: 'Place your Goal',
          }
        } else {
          if (state.waypoints.length < 2) {
            return {
              ...state,
              waypoints: [
                ...state.waypoints.slice(0, state.waypoints.length),
                { lat: markerLat, lng: markerLng },
              ],
              StartBool: true,
              hint: 'Place your Starting Point',
            }
          } else {
            return {
              ...state,
              waypoints: [
                ...state.waypoints.slice(0, state.waypoints.length - 1),
                { lat: markerLat, lng: markerLng },
              ],
              StartBool: true,
              hint: 'Place your Starting Point',
            }
          }
        }
      }
    case ACTIONS.CHANGE_MODE:
      if (state.addWaypoints && state.StartBool) {
        return {
          ...state,
          addWaypoints: !state.addWaypoints,
          hint: 'Place your Starting Point',
        }
      } else if (state.addWaypoints && !state.StartBool) {
        return {
          ...state,
          addWaypoints: !state.addWaypoints,
          hint: 'Place your Goal',
        }
      } else {
        return {
          ...state,
          addWaypoints: !state.addWaypoints,
          hint: 'Add Waypoints',
        }
      }

    case ACTIONS.SAVE_TRIP:
      return {
        ...state,
        trips: [...state.trips, state.waypoints],
        waypoints: [],
      }

    default:
      return state
  }
}
