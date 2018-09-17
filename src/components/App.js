import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { saveToLocalStorage } from '../middleware'
import reducer from '../reducer'
import MapScreenContainer from '../container/MapScreenContainer'
import OverviewScreenContainer from '../container/OverviewScreenContainer'

const store = createStore(reducer, applyMiddleware(saveToLocalStorage))

export default class App extends Component {
  componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate()
    })
  }

  render() {
    return (
      <Router>
        <Provider store={store}>
          <div>
            <Route exact path="/" component={OverviewScreenContainer} />
            <Route path="/addRoute" component={MapScreenContainer} />
          </div>
        </Provider>
      </Router>
    )
  }
}
