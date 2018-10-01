import { connect } from 'react-redux'
import {} from '../actions'
import RouteCollectionScreen from '../screens/RouteCollectionScreen'

const mapStateToProps = state => ({
  state: state,
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouteCollectionScreen)
