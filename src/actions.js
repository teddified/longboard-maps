import { createAction } from 'redux-actions'

const ACTIONS = {
  CHANGE_POSITION: 'CHANGE_POSITION',
  CHANGE_MODE: 'CHANGE_MODE',
  UPDATE_DIRECTIONS: 'UPDATE_DIRECTIONS',
  SET_DISTANCE: 'SET_DISTANCE',
  SAVE_TRIP: 'SAVE_TRIP',
}
export const changePosition = createAction(ACTIONS.CHANGE_POSITION)
export const changeMode = createAction(ACTIONS.CHANGE_MODE)
export const saveTrip = createAction(ACTIONS.SAVE_TRIP)

export default ACTIONS
