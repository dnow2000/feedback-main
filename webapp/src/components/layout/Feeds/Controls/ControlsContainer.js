import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import withQuery from 'with-react-query'

import selectRoleByUserIdAndType from 'selectors/selectRoleByUserIdAndType'

import Controls from './Controls'


const mapStateToProps = (state, ownProps) => {
  const { currentUser } = ownProps
  const { id: currentUserId } = currentUser || {}

  const editorRole = selectRoleByUserIdAndType(state, currentUserId, 'editor')
  const canCreateArticle = typeof editorRole !== 'undefined'

  return {
    canCreateArticle,
  }
}

export default compose(
  withRouter,
  withQuery(),
  connect(mapStateToProps)
)(Controls)
