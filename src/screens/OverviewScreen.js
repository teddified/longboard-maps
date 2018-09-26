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

const StyledButton = styled.button`
  width: 300px;
  height: 10%;
  border-radius: 10px;
  text-align: center;
  font-size: 24px;
  margin-bottom: 10px;
  border-bottom: 3px solid #274d7a;
`

const StyledBox = styled.div`
  height: 80%;
  overflow: hidden;
  position: relative;
`

const StyledTripCardSection = styled.div`
  height: 100%;
  width: 320px;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;

  &::after {
    content: '';
    background: linear-gradient(transparent, white 80%);
    position: absolute;
    height: 80px;
    bottom: 0;
    left: 0;
    right: 0;
  }
`

export default class OverviewScreen extends Component {
  render() {
    return (
      <React.Fragment>
        <StyledApp>
          <StyledHeader data-test-id="TripHeader">Your Trips</StyledHeader>
          <StyledBox>
            <StyledTripCardSection data-test-id="TripCardSection">
              <TripCard />
            </StyledTripCardSection>
          </StyledBox>
          <Link to="/addRoute">
            <StyledButton data-test-id="AddButton">+</StyledButton>
          </Link>
        </StyledApp>
      </React.Fragment>
    )
  }
}
