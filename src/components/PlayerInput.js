import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class PlayerInput extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  }

  state = {
    inputValue: '',
  }

  updateInputValue = event => {
    this.setState({
      inputValue: event.target.value,
    })
  }

  checkForEnterButton = event => {
    if (event.key === 'Enter') {
      this.submit()
    }
  }

  submit = () => {
    if (this.state.inputValue !== '') {
      this.props.onSubmit(this.state.inputValue)
      this.setState({
        inputValue: '',
      })
    }
  }

  render() {
    return (
      <div>
        <input
          onChange={this.updateInputValue}
          onKeyUp={this.checkForEnterButton}
          value={this.state.inputValue}
          type="text"
          autoFocus
          placeholder="Player name"
        />
      </div>
    )
  }
}
