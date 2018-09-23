import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import TripCard from '../components/TripCard'

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

const StyledButton = styled.button`
  width: 300px;
  height: 10%;
  border-radius: 10px;
  text-align: center;
  font-size: 24px;
  margin-bottom: 10px;
  border-bottom: 3px solid #274d7a;
`

const StyledTripCardSection = styled.div`
  height: 90%;
  width: 320px;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const StyledHeader = styled.div`
  background: #4a90e2;
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 38px;
  color: #274d7a;
  border-bottom: 3px solid #273d7a;
`

export default class OverviewScreen extends Component {
  render() {
    return (
      <React.Fragment>
        <StyledApp>
          <StyledHeader>Your Trips</StyledHeader>
          <StyledTripCardSection>
            <TripCard />
          </StyledTripCardSection>
          <Link to="/addRoute">
            <StyledButton>+</StyledButton>
          </Link>
        </StyledApp>
      </React.Fragment>
    )
  }
}
