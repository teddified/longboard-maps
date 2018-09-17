import reducer from './reducer'
import ACTIONS from './actions'

describe('reducer', () => {
  describe(ACTIONS.ADD_PLAYER, () => {
    it('creates a player with a name', () => {
      const state = {
        players: [],
      }
      const action = { type: ACTIONS.ADD_PLAYER, payload: { name: 'Foobar' } }

      expect(reducer(state, action)).toEqual({
        players: [{ name: 'Foobar', roundscore: 0, score: [] }],
      })
    })
  })

  describe(ACTIONS.DELETE_ALL_PLAYERS, () => {
    it('makes the players an empty array', () => {
      const state = {
        players: [{ foo: 'bar' }, { baz: 'foobar' }],
      }

      const action = { type: ACTIONS.DELETE_ALL_PLAYERS }

      expect(reducer(state, action)).toEqual({ players: [] })
    })
  })
  describe(ACTIONS.DELETE_PLAYER, () => {
    it('delete one entry in players', () => {
      const state = {
        players: [{ name: 'tom', score: [], roundscore: 10 }],
      }

      const action = { type: ACTIONS.DELETE_PLAYER, payload: { index: 0 } }

      expect(reducer(state, action)).toEqual({
        players: [],
      })
    })
  })
})
