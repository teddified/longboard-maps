import React, { Component } from 'react'
import styled from 'styled-components'

const StyledBoxActive = styled.div`
  height: 30px;
  width: 80px;
  color: white;
  background: #94d82d;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.1s all ease-in-out;
`

const StyledBoxNotActive = styled.div`
  height: 30px;
  width: 80px;
  color: #94d82d;
  background: white;
  border: 1px solid #94d82d;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.1s all ease-in;

  &:hover {
    color: white;
    background: #94d82d;
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
