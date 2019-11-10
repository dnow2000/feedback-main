import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import withQuery from 'with-react-query'
import withForm from 'with-react-form'

import withRequiredLogin from 'components/hocs/withRequiredLogin'
import selectRoleByUserIdAndType from 'selectors/selectRoleByUserIdAndType'

import Articles from './Articles'
import selectArticles from './selectors/selectArticles'

const mapStateToProps = (state, ownProps) => {
  const { currentUser } = ownProps
  const { id: currentUserId } = currentUser || {}

  const editorRole = selectRoleByUserIdAndType(state, currentUserId, 'editor')

  const canCreateArticle = typeof editorRole !== 'undefined'

  return {
    articles: selectArticles(state),
    canCreateArticle,
  }
}

export default compose(
  withRouter,
  withRequiredLogin,
  withQuery(),
  withForm,
  connect(mapStateToProps)
)(Articles)
