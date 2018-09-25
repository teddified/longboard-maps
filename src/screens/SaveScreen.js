import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Input from '../components/Input'

const StyledApp = styled.div`
  margin: 0 auto;
  width: 320px;
  height: 673px;
  background: white;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
`

const StyledHeader = styled.div`
  background: #4a90e2;
  width: 100%;
  height: 10%;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 38px;
  color: #274d7a;
  border-bottom: 3px solid #273d7a;
`

const StyledBox = styled.div`
  height: 80%;
  overflow: hidden;
  position: relative;
`

const StyledButton = styled.button`
  width: 300px;
  height: 10%;
  border-radius: 10px;
  text-align: center;
  font-size: 24px;
  margin-bottom: 10px;
  border-bottom: 3px solid #274d7a;
`

export default class SaveScreen extends Component {
  render() {
    return (
      <StyledApp>
        <StyledHeader>Save Trip</StyledHeader>
        <StyledBox>
          <label>Trip Name:</label>
          <Input />
        </StyledBox>

        <Link to="/">
          <StyledButton>Save</StyledButton>
        </Link>
      </StyledApp>
    )
  }
}
