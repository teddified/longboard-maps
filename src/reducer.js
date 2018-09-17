import { load } from './services'
import ACTIONS from './actions'

const initialState = {
  markerStart: { lat: 53.572536, lng: 9.983114 },
  markerEnd: { lat: 53.573269, lng: 9.999397 },
  StartBool: true,
}

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case ACTIONS.CHANGE_POSITION:
      const func = action.payload[2]
      let markerLat = func.latLng.lat()
      let markerLng = func.latLng.lng()
      if (state.StartBool) {
        return {
          ...state,
          markerStart: { lat: markerLat, lng: markerLng },
          StartBool: false,
        }
      } else {
        return {
          ...state,
          markerEnd: { lat: markerLat, lng: markerLng },
          StartBool: true,
        }
      }
    default:
      return state
  }
}
