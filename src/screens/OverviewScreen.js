import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class OverviewScreen extends Component {
  render() {
    return (
      <Link to="/addRoute">
        <button>add Route</button>
      </Link>
    )
  }
}
