import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const StyledButton = styled.button`
  border-radius: 5px;
  outline: none;
  background: white;

  &:hover {
    background: #00aced;
  }
`

export default class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.string,
  }

  render() {
    const { onClick, children } = this.props
    return <StyledButton onClick={onClick}>{children}</StyledButton>
  }
}
