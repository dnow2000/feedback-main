import { connect } from 'react-redux'
import { selectEntityByKeyAndId } from 'redux-thunk-data'

import selectReviewsByArticleIdAndVerdictId from 'selectors/selectReviewsByArticleIdAndVerdictId'

import VerdictItem from './VerdictItem'

const mapStateToProps = (state, ownProps) =>  {
  const { verdict } = ownProps
  const { articleId, id, userId } = verdict || {}
  return {
    article: selectEntityByKeyAndId(state, 'articles', articleId),
    reviews: selectReviewsByArticleIdAndVerdictId(
      state,
      articleId,
      id
    ),
    user: selectEntityByKeyAndId(state, 'users', userId),
  }
}

export default connect(mapStateToProps)(VerdictItem)
