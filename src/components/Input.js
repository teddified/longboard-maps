import React, { Component } from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  box-sizing: border-box;
  height: 24px;
  width: 200px;
  outline: none;
  padding-bottom: 2px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
`

const StyledContainer = styled.div`
  position: relative;
  height: 24px;
`

const StyledBorder = styled.div`
  z-index: 1;
  position: absolute;
  bottom: 0px;
  width: ${props => props.borderWidth};
  height: 1px;
  padding: 0;
  margin: 0;
  background: #4a90e2;
  transition: 0.2s all ease-out;
`

export default class Input extends Component {
  state = {
    borderWidth: '0',
  }

  updateInputValue = event => {
    const { updateTripName } = this.props
    updateTripName(event.target.value)
  }

  render() {
    const { state } = this.props
    return (
      <StyledContainer>
        <StyledInput
          data-test-id="TripInput"
          maxLength="10"
          onChange={this.updateInputValue}
          value={state.tripName || ''}
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
