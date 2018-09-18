// import { save } from './services'

export const saveToLocalStorage = store => next => action => {
  let result = next(action)
  // const newState = store.getState()
  // save('players', newState.players)
  return result
}
