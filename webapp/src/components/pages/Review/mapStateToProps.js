import { selectCurrentUser } from 'with-react-redux-login'

import selectFormInitialValuesByArticleId from './selectFormInitialValuesByArticleId'
import {
  getArticleIdByMatchAndQuery,
  selectArticleById,
  selectVerdictsByArticleIdAndByUserId
} from '../../../selectors'

function mapStateToProps(state, ownProps) {
  const articleId = getArticleIdByMatchAndQuery(
    state,
    ownProps.match,
    ownProps.query
  )

  const formInitialValues = selectFormInitialValuesByArticleId(state, articleId)
  const currentUser = selectCurrentUser(state)
  const { id: userId } = (currentUser || {})
  return {
    article: selectArticleById(state, articleId),
    formInitialValues,
    verdicts: selectVerdictsByArticleIdAndByUserId(state, articleId, userId)
  }
}

export default mapStateToProps
