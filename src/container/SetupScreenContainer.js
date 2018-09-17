import { connect } from 'react-redux'
import SetupScreen from '../components/SetupScreen'
import { deletePlayer, deleteAllPlayers } from '../actions'

const mapStateToProps = state => ({
  players: state.players,
})

const mapDispatchToProps = dispatch => ({
  deletePlayer: index => dispatch(deletePlayer({ index })),
  deleteAllPlayers: () => dispatch(deleteAllPlayers()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetupScreen)
