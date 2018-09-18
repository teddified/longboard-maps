// import { load } from './services'
import ACTIONS from './actions'

const initialState = {
  waypoints: [
    { lat: 53.572536, lng: 9.983114 },
    { lat: 53.573269, lng: 9.999397 },
  ],
  StartBool: true,
  addWaypoints: false,
  hint: 'Place your Starting Point',
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
          }
        } else {
          return {
            ...state,
            waypoints: [
              ...state.waypoints.slice(0, state.waypoints.length - 1),
              { lat: markerLat, lng: markerLng },
            ],
            StartBool: true,
          }
        }
      }
    case ACTIONS.CHANGE_MODE:
      return {
        ...state,
        addWaypoints: !state.addWaypoints,
      }

    default:
      return state
  }
}
