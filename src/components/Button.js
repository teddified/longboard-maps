import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.string,
  }

  render() {
    const { onClick, children } = this.props
    return <button onClick={onClick}>{children}</button>
  }
}
