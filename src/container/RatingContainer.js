import { connect } from 'react-redux'
import Rating from '../components/Rating'
import { changeToActive } from '../actions'

const mapStateToProps = state => ({
  state: state,
})

const mapDispatchToProps = dispatch => ({
  changeToActive: (value, name) => dispatch(changeToActive({ value, name })),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rating)
