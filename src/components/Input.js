import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledInput = styled.input`
  height: 24px;
  width: 200px;
  outline: none;
  padding-bottom: 2px;
  font-size: 18px;
  border: none;
  border-bottom: 1px solid #274d7a;
`

const StyledContainer = styled.div`
  position: relative;
`

const StyledBorder = styled.div`
  z-index: 1;
  position: absolute;
  bottom: 0px;
  width: ${props => props.borderWidth};
  height: 1.2px;
  padding: 0;
  margin: 0;
  background: hotpink;
  transition: 0.2s all ease-out;
`

export default class Input extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  }

  state = {
    inputValue: '',
    borderWidth: '0',
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
      <StyledContainer>
        <StyledInput
          data-test-id="TripInput"
          onChange={this.updateInputValue}
          onKeyUp={this.checkForEnterButton}
          value={this.state.inputValue}
          onFocus={() => {
            this.setState({ borderWidth: '100%' })
          }}
          onBlur={() => {
            this.setState({ borderWidth: '0px' })
          }}
          type="text"
          placeholder={this.props.placeholder}
        />
        <StyledBorder borderWidth={this.state.borderWidth} />
      </StyledContainer>
    )
  }
}
