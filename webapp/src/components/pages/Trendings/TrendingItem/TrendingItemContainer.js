import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectCurrentUser } from 'with-react-redux-login'

import TrendingItem from './TrendingItem'
import { selectRoleByUserIdAndType } from '../../../../selectors'

const mapStateToProps = state =>  {
  const currentUser = selectCurrentUser(state)
  const { id: currentUserId } = currentUser || {}

  const editorRole = selectRoleByUserIdAndType(state, currentUserId, 'editor')

  const canVerdict = typeof editorRole !== 'undefined'

  return {
    canVerdict,
  }
}

export default compose(
  connect(mapStateToProps)
)(TrendingItem)
