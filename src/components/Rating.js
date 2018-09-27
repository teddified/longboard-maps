import React, { Component } from 'react'
import styled from 'styled-components'

const StyledBoxActive = styled.div`
  height: 30px;
  width: 80px;
  color: white;
  background: #4a90e2;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.1s all ease-in-out;
  &:hover {
    color: #4a90e2;
    background: white;
    border: 1px solid #4a90e2;
  }
`

const StyledBoxNotActive = styled.div`
  height: 30px;
  width: 80px;
  color: #4a90e2;
  background: white;
  border: 1px solid #4a90e2;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.1s all ease-in;

  &:hover {
    color: white;
    background: #4a90e2;
    border: none;
  }
`

export default class Rating extends Component {
  render() {
    const { state, changeToActive, name } = this.props
    return (
      <React.Fragment>
        {state.rating[name].easy ? (
          <StyledBoxActive>easy</StyledBoxActive>
        ) : (
          <StyledBoxNotActive onClick={() => changeToActive('easy', name)}>
            easy
          </StyledBoxNotActive>
        )}
        {state.rating[name].medium ? (
          <StyledBoxActive>medium</StyledBoxActive>
        ) : (
          <StyledBoxNotActive onClick={() => changeToActive('medium', name)}>
            medium
          </StyledBoxNotActive>
        )}
        {state.rating[name].hard ? (
          <StyledBoxActive>hard</StyledBoxActive>
        ) : (
          <StyledBoxNotActive onClick={() => changeToActive('hard', name)}>
            hard
          </StyledBoxNotActive>
        )}
      </React.Fragment>
    )
  }
}
