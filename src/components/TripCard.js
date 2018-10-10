import React, { Component } from 'react'
import styled from 'styled-components'

const StyledCard = styled.div`
  position: relative;
  width: 95%;
  height: ${props => props.cardHeight};
  min-height: ${props => props.cardHeight};
  border-radius: 3px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow: hidden;
  background: white;
  transition: 0.3s all ease-out;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.19), 0 3px 3px rgba(0, 0, 0, 0.23);
  justify-content: space-between;

  > tripTitle {
    align-self: center;
  }
`

const DetailBody = styled.div`
  height: 120px;
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
`

const StyledName = styled.div`
  font-size: 24px;
  width: 140px;
  overflow: hidden;

  @media screen and (max-width: 374px) {
    font-size: 18px;
  }
`

const StyledRating = styled.div`
  width: 120px;
  display: flex;
  justify-content: space-between;
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
        cardHeight: '200px',
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
              <StyledRating>
                <span style={{ color: '#888' }}>Rating:</span>
                <span>{trip.totalRating}</span>
              </StyledRating>
              <StyledRating>
                <span style={{ color: '#888' }}>Distance:</span>
                <span>{trip.distance}</span>{' '}
              </StyledRating>
            </div>
          </TitleSection>
          {this.state.expand ? (
            <DetailBody>
              <StyledItem>
                <div style={{ color: '#888' }}>Road:</div>
                <span>
                  <div style={{ color: 'green' }}>
                    {trip.rating.road.easy ? 'easy' : ''}
                  </div>
                  <div style={{ color: 'orange' }}>
                    {trip.rating.road.medium ? 'medium' : ''}
                  </div>
                  <div style={{ color: 'red' }}>
                    {trip.rating.road.hard ? 'hard' : ''}
                  </div>
                </span>
              </StyledItem>
              <StyledItem>
                <div style={{ color: '#888' }}>Level of Crowdiness:</div>
                <span>
                  <div style={{ color: 'green' }}>
                    {trip.rating.crowd.easy ? 'easy' : ''}
                  </div>
                  <div style={{ color: 'orange' }}>
                    {trip.rating.crowd.medium ? 'medium' : ''}
                  </div>
                  <div style={{ color: 'red' }}>
                    {trip.rating.crowd.hard ? 'hard' : ''}
                  </div>
                </span>
              </StyledItem>
              <StyledItem>
                <div style={{ color: '#888' }}>Difficulty:</div>
                <span>
                  <div style={{ color: 'green' }}>
                    {trip.rating.difficulty.easy ? 'easy' : ''}
                  </div>
                  <div style={{ color: 'orange' }}>
                    {trip.rating.difficulty.medium ? 'medium' : ''}
                  </div>
                  <div style={{ color: 'red' }}>
                    {trip.rating.difficulty.hard ? 'hard' : ''}
                  </div>
                </span>
              </StyledItem>
              <StyledItem>
                <div style={{ color: '#888' }}>Gradient:</div>
                <span>
                  <div style={{ color: 'green' }}>
                    {trip.rating.gradient.easy ? 'easy' : ''}
                  </div>
                  <div style={{ color: 'orange' }}>
                    {trip.rating.gradient.medium ? 'medium' : ''}
                  </div>
                  <div style={{ color: 'red' }}>
                    {trip.rating.gradient.hard ? 'hard' : ''}
                  </div>
                </span>
              </StyledItem>
            </DetailBody>
          ) : (
            ''
          )}
        </StyledCard>
      </React.Fragment>
    )
  }
}
