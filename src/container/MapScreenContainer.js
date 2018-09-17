import { connect } from 'react-redux'
import MapScreen from '../screens/MapScreen'
import { changePosition } from '../actions'

const mapStateToProps = state => ({
  state: state,
})

const mapDispatchToProps = dispatch => ({
  changePosition: (...props) => dispatch(changePosition(props[0])),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapScreen)
