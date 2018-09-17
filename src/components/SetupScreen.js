import React, { Component } from 'react'
import { StyledButton } from './Button'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import PlayerInputContainer from '../container/PlayerInputContainer'

const StyledApp = styled.div`
  display: flex;
  background: white;
  align-items: center;
  flex-direction: column;
  height: 90vh;
  border: 2px solid #ddd;
  border-radius: 10px;

  & > * {
    margin: 5px;
  }
`

const StyledPlayButton = styled(StyledButton)`
  width: 200px;
  height: 100px;
  font-size: 60px;
`

const InputArea = styled.div`
  height: 350px;
  width: 280px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 10px;
`

const StyledLabel = styled.div`
  height: 100px;
  color: #888;
`

const StyledListItems = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 18px;
  &:nth-child(2n) {
    background: aliceblue;
  }
  &:hover {
    text-decoration: line-through;
    color: #888;
  }
`

const StyledDeleteAllButton = styled.button`
  width: 100px;
  height: 40px;
  color: black;
  font-size: 12px;
  font-weight: bold;
  background: #ccc;
  border-radius: 10px;
`

export default class SetupScreen extends Component {
  static propTypes = {
    players: PropTypes.array.isRequired,
    deletePlayer: PropTypes.func.isRequired,
    deleteAllPlayers: PropTypes.func.isRequired,
  }

  renderUsername() {
    const { players, deletePlayer } = this.props
    return (
      <React.Fragment>
        {players.map((user, index) => (
          <StyledListItems
            data-test-id="SetupScreen-player"
            onClick={() => deletePlayer(index)}
            key={index}
          >
            {user.name}
          </StyledListItems>
        ))}
      </React.Fragment>
    )
  }

  renderCheckStartable() {
    const { players, deleteAllPlayers } = this.props
    if (players.length > 0) {
      return (
        <React.Fragment>
          <Link to="/summary">
            <StyledPlayButton data-test-id="SetupScreen-playButton">
              Play!
            </StyledPlayButton>
          </Link>
          <StyledDeleteAllButton onClick={deleteAllPlayers}>
            Reset Players
          </StyledDeleteAllButton>
        </React.Fragment>
      )
    } else {
      return (
        <StyledLabel data-test-id="SetupScreen-hintText">
          Please enter a Player
        </StyledLabel>
      )
    }
  }

  render() {
    return (
      <div>
        <StyledApp>
          <h1>Start Screen</h1>
          <PlayerInputContainer />
          <InputArea>{this.renderUsername()}</InputArea>
          {this.renderCheckStartable()}
        </StyledApp>
      </div>
    )
  }
}
