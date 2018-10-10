import { connect } from 'react-redux'
import SaveScreen from '../screens/SaveScreen'
import { saveTrip, postNewTrip } from '../actions'

const mapStateToProps = state => ({
  state: state,
})

const mapDispatchToProps = dispatch => ({
  saveTrip: name => dispatch(saveTrip({ name })),
  postNewTrip: trips => dispatch(postNewTrip({ trips })),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveScreen)
