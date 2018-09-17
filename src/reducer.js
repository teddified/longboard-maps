import { load } from './services'
import ACTIONS from './actions'

const initialState = {
  players: load('players') || [],
}

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case ACTIONS.DELETE_ALL_PLAYERS:
      return {
        ...state,
        players: [],
      }
    case ACTIONS.DELETE_PLAYER:
      return {
        ...state,
        players: [
          ...state.players.slice(0, action.payload.index),
          ...state.players.slice(action.payload.index + 1),
        ],
      }
    case ACTIONS.ADD_PLAYER:
      return {
        ...state,
        players: [
          ...state.players,
          { name: action.payload.name, roundscore: 0, score: [] },
        ],
      }
    default:
      return state
  }
}
