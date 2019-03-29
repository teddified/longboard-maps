import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import RatingContainer from '../container/RatingContainer'
import TripInputContainer from '../container/TripInputContainer'
import Navbar from '../components/Navbar'

const StyledApp = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100vh;
  background: #f7f7f7;
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
  height: 82%;
  overflow: hidden;
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`

const StyledButton = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 10px;
  text-align: center;
  font-size: 20px;
  outline: none;
  background: none;
  border: 1px solid #ddd;
`

const StyledRatingBoxSection = styled.div`
  width: 100%;
  height: 100px;
  overflow: hidden;

  @media screen and (min-width: 426px) {
    width: 425px;
  }
`

const StyledBoxTitle = styled.div`
  width: 100%;
  height: 33%;
  background: white;
  color: #555;
  display: flex;
  align-items: flex-end;
  font-size: 20px;
  padding-left: 10px;
`

const StyledRatingBox = styled.div`
  height: 67%;
  width: 100%;
  background: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Test = styled.div`
  width: 100%;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.19), 0 3px 3px rgba(0, 0, 0, 0.23);
  @media screen and (min-width: 426px) {
    width: 425px;
  }
`

export default class SaveScreen extends Component {
  pushTotalRating() {
    const { state } = this.props
    this.newState = state

    const roadeasy = state.rating.road.easy ? 1 : 0
    const roadmed = state.rating.road.medium ? 2 : 0
    const roadhard = state.rating.road.hard ? 3 : 0
    const crowdeasy = state.rating.crowd.easy ? 1 : 0
    const crowdmed = state.rating.crowd.medium ? 2 : 0
    const crowdhard = state.rating.crowd.hard ? 3 : 0
    const difeasy = state.rating.difficulty.easy ? 1 : 0
    const difmed = state.rating.difficulty.medium ? 2 : 0
    const difhard = state.rating.difficulty.hard ? 3 : 0
    const gradienteasy = state.rating.gradient.easy ? 1 : 0
    const gradientmed = state.rating.gradient.medium ? 2 : 0
    const gradienthard = state.rating.gradient.hard ? 3 : 0
    const result =
      (roadeasy +
        roadmed +
        roadhard +
        crowdeasy +
        crowdmed +
        crowdhard +
        difeasy +
        difmed +
        difhard +
        gradienteasy +
        gradientmed +
        gradienthard) /
      4

    this.newState = {
      ...this.newState,
      totalRating: result,
    }

    return true
  }

  render() {
    const { saveTrip, postNewTrip, state } = this.props
    return (
      <StyledApp>
        <StyledHeader data-test-id="SaveHeader">Save Trip</StyledHeader>
        <StyledBody>
          <StyledRatingBoxSection
            style={{
              boxShadow:
                '0 1px 1px rgba(0, 0, 0, 0.19), 0 3px 3px rgba(0, 0, 0, 0.23)',
              borderRadius: '3px',
              height: '80px',
            }}
          >
            <StyledBoxTitle>Trip Name</StyledBoxTitle>
            <StyledRatingBox>
              <TripInputContainer placeholder="...insert name" />
            </StyledRatingBox>
          </StyledRatingBoxSection>
          <Test>
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
          </Test>
          <span
            style={{
              width: '300px',
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <Link to="/">
              <StyledButton
                disabled={state.tripName ? false : true}
                data-test-id="SaveButton"
                onClick={() =>
                  this.pushTotalRating() &&
                  saveTrip() &&
                  postNewTrip(this.newState)
                }
              >
                Save
              </StyledButton>
            </Link>
            <Link to="/addRoute">
              <StyledButton style={{ color: 'red', opacity: '0.8' }}>
                Back
              </StyledButton>
            </Link>
          </span>
        </StyledBody>
        <Navbar navHeigth={'10%'} />
      </StyledApp>
    )
  }
}
