import { selectTagsByUserId } from '../../../../../selectors'

function mapStateToProps (state, ownProps) {
  const { user } = ownProps
  const { id: userId } = (user || {})
  return {
    tags: selectTagsByUserId(state, userId)
  }
}

export default mapStateToProps
