import reducer from './reducer'
import ACTIONS from './actions'

describe('reducer', () => {
  describe(ACTIONS.CHANGE_POSITION, () => {
    it('Change latitude and langitute of start markers', () => {
      const state = {
        waypoints: [
          { lat: 51.5074, lng: -0.1278 },
          { lat: 51.5074, lng: -0.1278 },
        ],
        StartBool: true,
      }
      const action = {
        type: ACTIONS.CHANGE_POSITION,
        payload: {
          latLng: {
            lat: () => 53.4084,
            lng: () => -2.9916,
          },
        },
      }

      expect(reducer(state, action)).toEqual({
        hint: 'Place your Goal',
        waypoints: [
          { lat: 53.4084, lng: -2.9916 },
          { lat: 51.5074, lng: -0.1278 },
        ],
        StartBool: false,
      })
    })

    it('Change latitude and langitute of end markers', () => {
      const state = {
        waypoints: [
          { lat: 51.5074, lng: -0.1278 },
          { lat: 51.5074, lng: -0.1278 },
        ],
        StartBool: false,
      }
      const action = {
        type: ACTIONS.CHANGE_POSITION,
        payload: {
          latLng: {
            lat: () => 53.4084,
            lng: () => -2.9916,
          },
        },
      }

      expect(reducer(state, action)).toEqual({
        hint: 'Place your Starting Point',
        waypoints: [
          { lat: 51.5074, lng: -0.1278 },
          { lat: 53.4084, lng: -2.9916 },
        ],
        StartBool: true,
      })
    })

    it('add a waypoint', () => {
      const state = {
        addWaypoints: true,
        waypoints: [
          { lat: 51.5074, lng: -0.1278 },
          { lat: 51.5074, lng: -0.1278 },
        ],
      }
      const action = {
        type: ACTIONS.CHANGE_POSITION,
        payload: {
          latLng: {
            lat: () => 53.4084,
            lng: () => -2.9916,
          },
        },
      }

      expect(reducer(state, action)).toEqual({
        ...state,
        waypoints: [
          ...state.waypoints.slice(0, state.waypoints.length - 1),
          { lat: 53.4084, lng: -2.9916 },
          ...state.waypoints.slice(state.waypoints.length - 1),
        ],
      })
    })
  })

  describe(ACTIONS.CHANGE_MODE, () => {
    it('change mode to adding waypoints', () => {
      const state = {
        addWaypoints: false,
      }
      const action = { type: ACTIONS.CHANGE_MODE }

      expect(reducer(state, action)).toEqual({
        hint: 'Add Waypoints',
        addWaypoints: true,
      })
    })
  })

  describe(ACTIONS.SAVE_TRIP, () => {
    it('clear waypoints and add to trip', () => {
      const state = {
        waypoints: [
          { lat: 0, lng: 10 },
          { lat: 0, lng: 20 },
          { lat: 0, lng: 30 },
        ],
        trips: [
          [{ lat: 10, lng: 10 }, { lat: 20, lng: 10 }, { lat: 30, lng: 10 }],
        ],
      }
      const action = { type: ACTIONS.SAVE_TRIP }

      expect(reducer(state, action)).toEqual({
        waypoints: [],
        trips: [
          [{ lat: 10, lng: 10 }, { lat: 20, lng: 10 }, { lat: 30, lng: 10 }],
          [{ lat: 0, lng: 10 }, { lat: 0, lng: 20 }, { lat: 0, lng: 30 }],
        ],
      })
    })
  })
})
