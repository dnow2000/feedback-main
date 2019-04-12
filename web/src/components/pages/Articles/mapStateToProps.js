import {
  selectArticles,
  selectEditorRoleByUserId,
} from '../../../selectors'

function mapStateToProps(state, ownProps) {
  const { currentUser } = ownProps
  const { id: currentUserId } = currentUser || {}

  const editorRole = selectEditorRoleByUserId(state, currentUserId)

  const canCreateArticle = typeof editorRole !== 'undefined'

  return {
    articles: selectArticles(state),
    canCreateArticle,
  }
}

export default mapStateToProps
