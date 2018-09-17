import { createAction } from 'redux-actions'

const ACTIONS = {
  CHANGE_POSITION: 'CHANGE_POSITION',
}
export const changePosition = createAction(ACTIONS.CHANGE_POSITION)

export default ACTIONS
