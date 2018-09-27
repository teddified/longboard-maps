import { createAction } from 'redux-actions'

const ACTIONS = {
  CHANGE_POSITION: 'CHANGE_POSITION',
  CHANGE_MODE: 'CHANGE_MODE',
  UPDATE_DIRECTIONS: 'UPDATE_DIRECTIONS',
  SET_DISTANCE: 'SET_DISTANCE',
  SAVE_TRIP: 'SAVE_TRIP',
  CHANGE_TO_ACTIVE: 'CHANGE_TO_ACTIVE',
  UPDATE_TRIP_NAME: 'UPDATE_TRIP_NAME',
}
export const changePosition = createAction(ACTIONS.CHANGE_POSITION)
export const changeMode = createAction(ACTIONS.CHANGE_MODE)
export const saveTrip = createAction(ACTIONS.SAVE_TRIP)
export const changeToActive = createAction(ACTIONS.CHANGE_TO_ACTIVE)
export const updateTripName = createAction(ACTIONS.UPDATE_TRIP_NAME)

export default ACTIONS
