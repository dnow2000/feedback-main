import { connect } from 'react-redux'

import selectArticleById from 'selectors/selectArticleById'
import selectReviewsByArticleIdAndVerdictId from 'selectors/selectReviewsByArticleIdAndVerdictId'
import selectUserById from 'selectors/selectUserById'

import VerdictItem from './VerdictItem'

const mapStateToProps = (state, ownProps) =>  {
  const { verdict } = ownProps
  const { articleId, id, userId } = verdict || {}
  return {
    article: selectArticleById(state, articleId),
    reviews: selectReviewsByArticleIdAndVerdictId(
      state,
      articleId,
      id
    ),
    user: selectUserById(state, userId),
  }
}

export default connect(mapStateToProps)(VerdictItem)
