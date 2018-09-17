import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { applyMiddleware, createStore } from 'redux'
import styled from 'styled-components'
import { Provider } from 'react-redux'
import { saveToLocalStorage } from '../middleware'
import reducer from '../reducer'
import LoginScreenContainer from '../container/LoginScreenContainer'

const store = createStore(reducer, applyMiddleware(saveToLocalStorage))

export default class App extends Component {
  // componentDidMount() {
  //   store.subscribe(() => {
  //     this.forceUpdate()
  //   })
  // }

  render() {
    return (
      <Router>
        <Provider store={store}>
          <Route exact path="/" component={LoginScreenContainer} />
        </Provider>
      </Router>
    )
  }
}
