import { connect } from 'react-redux'
import MapScreen from '../screens/MapScreen'
import {
  changePosition,
  changeMode,
  saveTrip,
  updateDistance,
} from '../actions'

const mapStateToProps = state => ({
  state: state,
})

const mapDispatchToProps = dispatch => ({
  changePosition: (...props) => dispatch(changePosition(props[0])),
  changeMode: () => dispatch(changeMode()),
  saveTrip: () => dispatch(saveTrip()),
  updateDistance: distance => dispatch(updateDistance({ distance })),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapScreen)
