import { createAction } from 'redux-actions'

const ACTIONS = {
  CHANGE_POSITION: 'CHANGE_POSITION',
  CHANGE_MODE: 'CHANGE_MODE',
  UPDATE_DIRECTIONS: 'UPDATE_DIRECTIONS',
}
export const changePosition = createAction(ACTIONS.CHANGE_POSITION)
export const changeMode = createAction(ACTIONS.CHANGE_MODE)
export const updateDirections = createAction(ACTIONS.UPDATE_DIRECTIONS)

export default ACTIONS
