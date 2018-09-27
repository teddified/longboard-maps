import React, { Component } from 'react'
import styled from 'styled-components'

const StyledCard = styled.div`
  width: 95%;
  height: ${props => props.cardHeight};
  min-height: ${props => props.cardHeight};
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow: hidden;
  background: #eee;
  border-bottom: 3px solid #274d7a;
  transition: 0.3s all ease-out;

  > imgageSection {
    width: 100%;
    height: 100%;
  }

  > tripTitle {
    align-self: center;
  }
`

const DetailBody = styled.div`
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const StyledItem = styled.div`
  display: flex;
  justify-content: space-between;
`

const TitleSection = styled.div`
  height: 46px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
`

const StyledName = styled.div`
  font-size: 28px;
  width: 160px;
  overflow: hidden;
`

const StyledRating = styled.div`
  text-align: right;
`

export default class TripCard extends Component {
  state = {
    cardHeight: '80px',
    expand: false,
    ratingInNumber: null,
  }

  renderDetails() {
    if (this.state.expand) {
      this.setState({
        cardHeight: '80px',
        expand: false,
      })
    } else {
      this.setState({
        cardHeight: '160px',
        expand: true,
      })
    }
  }

  render() {
    const { trip } = this.props
    return (
      <React.Fragment>
        <StyledCard
          data-test-id="TripCard"
          onClick={() => this.renderDetails()}
          cardHeight={this.state.cardHeight}
        >
          <TitleSection>
            <StyledName>{trip.tripName}</StyledName>
            <div>
              <StyledRating>Rating: {trip.totalRating}</StyledRating>
              <StyledRating>Distance: {trip.distance}</StyledRating>
            </div>
          </TitleSection>
          {this.state.expand ? (
            <DetailBody>
              <StyledItem>
                Road:
                <span>
                  {trip.rating.road.easy ? 'easy' : ''}
                  {trip.rating.road.medium ? 'medium' : ''}
                  {trip.rating.road.hard ? 'hard' : ''}
                </span>
              </StyledItem>
              <StyledItem>
                Level of Crowdiness:
                <span>
                  {trip.rating.crowd.easy ? 'easy' : ''}
                  {trip.rating.crowd.medium ? 'medium' : ''}
                  {trip.rating.crowd.hard ? 'hard' : ''}
                </span>
              </StyledItem>
              <StyledItem>
                Difficulty:
                <span>
                  {trip.rating.difficulty.easy ? 'easy' : ''}
                  {trip.rating.difficulty.medium ? 'medium' : ''}
                  {trip.rating.difficulty.hard ? 'hard' : ''}
                </span>
              </StyledItem>
              <StyledItem>
                Gradient:
                <span>
                  {trip.rating.gradient.easy ? 'easy' : ''}
                  {trip.rating.gradient.medium ? 'medium' : ''}
                  {trip.rating.gradient.hard ? 'hard' : ''}
                </span>
              </StyledItem>
            </DetailBody>
          ) : (
            ''
          )}
          <div>
            {/* <img
                    src="https://source.unsplash.com/random/100x100"
                    alt=""
                  /> */}
          </div>
        </StyledCard>
      </React.Fragment>
    )
  }
}
