import { connect } from 'react-redux'
import { compose } from 'redux'

import Articles from './Articles'
import { withRequiredLogin } from '../../hocs'
import {
  selectArticles,
  selectRoleByUserIdAndType,
} from '../../../selectors'

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
  withRequiredLogin,
  connect(mapStateToProps)
)(Articles)
