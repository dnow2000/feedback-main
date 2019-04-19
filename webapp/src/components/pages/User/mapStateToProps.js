import { selectUserById } from '../../../selectors'

function mapStateToProps(state, ownProps) {
  const { match: { params: { userId } } } = ownProps
  return {
    user: selectUserById(state, userId)
  }
}

export default mapStateToProps
