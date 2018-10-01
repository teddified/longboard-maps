import { createAction } from 'redux-actions'

const ACTIONS = {
  CHANGE_POSITION: 'CHANGE_POSITION',
  CHANGE_MODE: 'CHANGE_MODE',
  SET_DISTANCE: 'SET_DISTANCE',
  SAVE_TRIP: 'SAVE_TRIP',
  CHANGE_TO_ACTIVE: 'CHANGE_TO_ACTIVE',
  UPDATE_TRIP_NAME: 'UPDATE_TRIP_NAME',
  UPDATE_DISTANCE: 'UPDATE_DISTANCE',
  SAVE_DIRECTIONS: 'SAVE_DIRECTIONS',
}
export const changePosition = createAction(ACTIONS.CHANGE_POSITION)
export const changeMode = createAction(ACTIONS.CHANGE_MODE)
export const saveTrip = createAction(ACTIONS.SAVE_TRIP)
export const changeToActive = createAction(ACTIONS.CHANGE_TO_ACTIVE)
export const updateTripName = createAction(ACTIONS.UPDATE_TRIP_NAME)
export const updateDistance = createAction(ACTIONS.UPDATE_DISTANCE)
export const saveDirections = createAction(ACTIONS.SAVE_DIRECTIONS)

export default ACTIONS
