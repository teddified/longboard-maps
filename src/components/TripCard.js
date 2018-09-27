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
  padding-left: 10px;
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
  display: flex;
  flex-direction: column;
`

export default class TripCard extends Component {
  state = {
    cardHeight: '70px',
    expand: false,
    ratingInNumber: null,
  }

  renderDetails() {
    if (this.state.expand) {
      this.setState({
        cardHeight: '70px',
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
    const { state } = this.props
    return (
      <React.Fragment>
        {state.trips &&
          state.trips.map((trip, index) => {
            return (
              <StyledCard
                key={index}
                data-test-id="TripCard"
                onClick={() => this.renderDetails()}
                cardHeight={this.state.cardHeight}
              >
                <titleSection>
                  <h2>{trip.tripName}</h2>
                  <div>Rating: {trip.totalRating}</div>
                </titleSection>
                {this.state.expand ? (
                  <DetailBody>
                    <div>test1</div>
                    <div>test2</div>
                    <div>test3</div>
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
            )
          })}
      </React.Fragment>
    )
  }
}
