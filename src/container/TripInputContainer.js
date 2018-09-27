import { connect } from 'react-redux'
import Input from '../components/Input'
import { updateTripName } from '../actions'

const mapStateToProps = state => ({
  state: state,
})

const mapDispatchToProps = dispatch => ({
  updateTripName: tripName => dispatch(updateTripName(tripName)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Input)
