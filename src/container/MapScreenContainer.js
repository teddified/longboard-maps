import { connect } from 'react-redux'
import MapScreen from '../screens/MapScreen'
import {
  changePosition,
  changeMode,
  saveTrip,
  updateDistance,
  saveDirections,
} from '../actions'

const mapStateToProps = state => ({
  state: state,
})

const mapDispatchToProps = dispatch => ({
  changePosition: (...props) => dispatch(changePosition(props[0])),
  changeMode: () => dispatch(changeMode()),
  saveTrip: () => dispatch(saveTrip()),
  updateDistance: distance => dispatch(updateDistance({ distance })),
  saveDirections: directions => dispatch(saveDirections({ directions })),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapScreen)
