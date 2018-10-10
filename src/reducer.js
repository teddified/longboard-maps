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
  tripName: null,
  polyline: null,
  firstRun: true,
  rating: {
    road: { easy: true, medium: false, hard: false },
    crowd: { easy: true, medium: false, hard: false },
    difficulty: { easy: true, medium: false, hard: false },
    gradient: { easy: true, medium: false, hard: false },
  },
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
      const roadeasy = state.rating.road.easy ? 1 : 0
      const roadmed = state.rating.road.medium ? 2 : 0
      const roadhard = state.rating.road.hard ? 3 : 0
      const crowdeasy = state.rating.crowd.easy ? 1 : 0
      const crowdmed = state.rating.crowd.medium ? 2 : 0
      const crowdhard = state.rating.crowd.hard ? 3 : 0
      const difeasy = state.rating.difficulty.easy ? 1 : 0
      const difmed = state.rating.difficulty.medium ? 2 : 0
      const difhard = state.rating.difficulty.hard ? 3 : 0
      const gradienteasy = state.rating.gradient.easy ? 1 : 0
      const gradientmed = state.rating.gradient.medium ? 2 : 0
      const gradienthard = state.rating.gradient.hard ? 3 : 0
      const result =
        (roadeasy +
          roadmed +
          roadhard +
          crowdeasy +
          crowdmed +
          crowdhard +
          difeasy +
          difmed +
          difhard +
          gradienteasy +
          gradientmed +
          gradienthard) /
        4
      return {
        ...state,
        trips: [
          ...state.trips,
          {
            waypoints: state.waypoints,
            tripName: state.tripName,
            rating: state.rating,
            totalRating: result,
            distance: state.distance,
            directions: state.directions,
            polyline: state.polyline,
          },
        ],
        waypoints: [],
        tripName: null,
        directions: null,
        distance: null,
        StartBool: true,
        addWaypoints: false,
        polyline: null,
        hint: 'Place your Starting Point',
        rating: {
          road: { easy: true, medium: false, hard: false },
          crowd: { easy: true, medium: false, hard: false },
          difficulty: { easy: true, medium: false, hard: false },
          gradient: { easy: true, medium: false, hard: false },
        },
      }

    case ACTIONS.CHANGE_TO_ACTIVE:
      switch (action.payload.value) {
        case 'easy':
          return {
            ...state,
            rating: {
              ...state.rating,
              [action.payload.name]: { easy: true, medium: false, hard: false },
            },
          }
        case 'medium':
          return {
            ...state,
            rating: {
              ...state.rating,
              [action.payload.name]: { easy: false, medium: true, hard: false },
            },
          }
        case 'hard':
          return {
            ...state,
            rating: {
              ...state.rating,
              [action.payload.name]: { easy: false, medium: false, hard: true },
            },
          }
        default:
          return state
      }

    case ACTIONS.UPDATE_TRIP_NAME:
      return {
        ...state,
        tripName: action.payload,
      }

    case ACTIONS.UPDATE_DISTANCE:
      if (state.waypoints.length > 2) {
        let distance = action.payload.distance.routes[0].legs.reduce(
          (acc, curr) => {
            return acc + curr.distance.value
          },
          0
        )
        const result = Number(distance / 1000).toFixed(1) + ' km'
        result.replace('.', ',')
        return {
          ...state,
          distance: result,
        }
      } else if (state.waypoints.length === 2) {
        const result = action.payload.distance.routes[0].legs[0].distance.text
        return {
          ...state,
          distance: result,
        }
      } else {
        return state
      }

    case ACTIONS.SAVE_DIRECTIONS:
      const path = action.payload.directions.routes[0].overview_path.map(
        path => {
          return { lat: path.lat(), lng: path.lng() }
        }
      )
      return {
        ...state,
        directions: action.payload.directions,
        polyline: path,
      }

    case ACTIONS.REPLACE_TRIPS:
      return {
        ...state,
        trips: action.payload.trips,
        firstRun: false,
      }

    case ACTIONS.TRIP_CREATED:
      return state

    default:
      return state
  }
}
