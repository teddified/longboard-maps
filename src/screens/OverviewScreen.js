import React, { Component } from 'react'
import styled from 'styled-components'
import TripCard from '../components/TripCard'
import NavBar from '../components/Navbar'

const StyledApp = styled.div`
  margin: 0 auto;
  width: 320px;
  height: 673px;
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
  /* border-bottom: 3px solid #ccc; */
`

// const StyledButton = styled.button`
//   width: 300px;
//   height: 10%;
//   border-radius: 10px;
//   text-align: center;
//   font-size: 24px;
//   margin-bottom: 10px;
//   border-bottom: 3px solid #274d7a;
// `

const StyledBox = styled.div`
  height: 82%;
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
              {this.props.state.trips.map((trip, index) => {
                return <TripCard key={index} trip={trip} />
              })}
            </StyledTripCardSection>
          </StyledBox>
          <NavBar />
        </StyledApp>
      </React.Fragment>
    )
  }
}
