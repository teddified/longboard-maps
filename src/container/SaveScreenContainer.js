import { connect } from 'react-redux'
import SaveScreen from '../screens/SaveScreen'
import { saveTrip } from '../actions'

const mapStateToProps = state => ({
  state: state,
})

const mapDispatchToProps = dispatch => ({
  saveTrip: name => dispatch(saveTrip({ name })),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveScreen)
