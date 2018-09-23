import { connect } from 'react-redux'
import MapScreen from '../screens/MapScreen'
import { changePosition, changeMode, updateDirections } from '../actions'

const mapStateToProps = state => ({
  state: state,
})

const mapDispatchToProps = dispatch => ({
  changePosition: (...props) => dispatch(changePosition(props[0])),
  changeMode: () => dispatch(changeMode()),
  updateDirections: directions => dispatch(updateDirections(directions)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapScreen)
