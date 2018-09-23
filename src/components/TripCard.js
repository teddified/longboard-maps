import React, { Component } from 'react'
import styled from 'styled-components'

const StyledCard = styled.div`
  width: 95%;
  height: 50px;
  border: 1px solid #ddd;
  border-radius: 3px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  overflow: hidden;
  background: #eee;
  border-bottom: 3px solid #274d7a;

  > imgageSection {
    width: 100%;
    height: 100%;
  }

  > tripTitle {
    align-self: center;
  }
`

export default class TripCard extends Component {
  state = {
    tripNames: ['Alstertrip', 'Messehallen'],
  }
  render() {
    return (
      <React.Fragment>
        {this.state.tripNames.map((name, index) => {
          return (
            <StyledCard key={index}>
              <triptitle>{name}</triptitle>
              <imagesection>
                <img src="https://source.unsplash.com/random/50x50" />
              </imagesection>
            </StyledCard>
          )
        })}
      </React.Fragment>
    )
  }
}
