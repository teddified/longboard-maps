import { connect } from 'react-redux'
import LoginScreen from '../components/LoginScreen'
import { addMarker } from '../actions'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  addMarker: coords => dispatch(addMarker({ coords })),
  // deletePlayer: index => dispatch(deletePlayer({ index })),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen)
