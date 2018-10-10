import { connect } from 'react-redux'
import OverviewScreen from '../screens/OverviewScreen'
import { fetchTrips } from '../actions'

const mapStateToProps = state => ({
  state: state,
})

const mapDispatchToProps = dispatch => ({
  fetchTrips: () => dispatch(fetchTrips()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverviewScreen)
