import { createAction } from 'redux-actions'

const ACTIONS = {
  DELETE_ALL_PLAYERS: 'DELETE_ALL_PLAYERS',
  ADD_PLAYER: 'ADD_PLAYER',
  DELETE_PLAYER: 'DELETE_PLAYER',
}

export const addPlayer = createAction(ACTIONS.ADD_PLAYER)
export const deletePlayer = createAction(ACTIONS.DELETE_PLAYER)
export const deleteAllPlayers = createAction(ACTIONS.DELETE_ALL_PLAYERS)

export default ACTIONS
