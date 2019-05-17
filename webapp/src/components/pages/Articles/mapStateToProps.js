import {
  selectArticles,
  selectRoleByUserIdAndType,
} from '../../../selectors'

function mapStateToProps(state, ownProps) {
  const { currentUser } = ownProps
  const { id: currentUserId } = currentUser || {}

  const editorRole = selectRoleByUserIdAndType(state, currentUserId, 'editor')

  const canCreateArticle = typeof editorRole !== 'undefined'

  return {
    articles: selectArticles(state),
    canCreateArticle,
  }
}

export default mapStateToProps
