import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import RatingContainer from '../container/RatingContainer'
import TripInputContainer from '../container/TripInputContainer'

const StyledApp = styled.div`
  margin: 0 auto;
  width: 320px;
  height: 673px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
`

const StyledHeader = styled.div`
  background: #343a40;
  width: 100%;
  height: 8%;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  color: white;
`

const StyledBody = styled.div`
  height: 80%;
  overflow: hidden;
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`

const StyledButton = styled.button`
  width: 300px;
  height: 10%;
  border-radius: 10px;
  text-align: center;
  font-size: 24px;
  margin-bottom: 10px;
  border-bottom: 3px solid #273d7a;
`

const StyledRatingBoxSection = styled.div`
  width: 100%;
  height: 80px;
  border: 1px solid #4a90e2;
`

const StyledBoxTitle = styled.div`
  width: 100%;
  height: 33%;
  background: #4a90e2;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 3px solid #273d7a;
`

const StyledRatingBox = styled.div`
  height: 67%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #273d7a;
`

export default class SaveScreen extends Component {
  render() {
    const { saveTrip, state } = this.props
    return (
      <StyledApp>
        <StyledHeader data-test-id="SaveHeader">Save Trip</StyledHeader>
        <StyledBody>
          <StyledRatingBoxSection>
            <StyledBoxTitle>Trip Name</StyledBoxTitle>
            <StyledRatingBox>
              <TripInputContainer placeholder="...insert name" />
            </StyledRatingBox>
          </StyledRatingBoxSection>
          <StyledRatingBoxSection>
            <StyledBoxTitle>Road Condition</StyledBoxTitle>
            <StyledRatingBox>
              <RatingContainer name="road" />
            </StyledRatingBox>
          </StyledRatingBoxSection>
          <StyledRatingBoxSection>
            <StyledBoxTitle>Level of Crowdiness</StyledBoxTitle>
            <StyledRatingBox>
              <RatingContainer name="crowd" />
            </StyledRatingBox>
          </StyledRatingBoxSection>
          <StyledRatingBoxSection>
            <StyledBoxTitle>Difficulty</StyledBoxTitle>
            <StyledRatingBox>
              <RatingContainer name="difficulty" />
            </StyledRatingBox>
          </StyledRatingBoxSection>
          <StyledRatingBoxSection>
            <StyledBoxTitle>Gradient</StyledBoxTitle>
            <StyledRatingBox>
              <RatingContainer name="gradient" />
            </StyledRatingBox>
          </StyledRatingBoxSection>
        </StyledBody>
        <Link to="/">
          <StyledButton
            disabled={state.tripName ? false : true}
            data-test-id="SaveButton"
            onClick={() => saveTrip()}
          >
            Save
          </StyledButton>
        </Link>
      </StyledApp>
    )
  }
}
