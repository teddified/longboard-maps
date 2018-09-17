import { connect } from 'react-redux'
import LoginScreen from '../components/LoginScreen'
import {} from '../actions'

const mapStateToProps = state => ({
  // players: state.players,
})

const mapDispatchToProps = dispatch => ({
  // deletePlayer: index => dispatch(deletePlayer({ index })),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen)
