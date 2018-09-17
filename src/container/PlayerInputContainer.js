import { connect } from 'react-redux'
import { addPlayer } from '../actions'
import PlayerInput from '../components/PlayerInput'

const mapDispatchToProps = dispatch => ({
  onSubmit: name => dispatch(addPlayer({ name })),
})

const wrappingFunction = connect(
  null,
  mapDispatchToProps
)

export default wrappingFunction(PlayerInput)
