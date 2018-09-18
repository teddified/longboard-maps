import { connect } from 'react-redux'
import MapScreen from '../screens/MapScreen'
import { changePosition, changeMode } from '../actions'

const mapStateToProps = state => ({
  state: state,
})

const mapDispatchToProps = dispatch => ({
  changePosition: (...props) => dispatch(changePosition(props[0])),
  changeMode: () => dispatch(changeMode()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapScreen)
