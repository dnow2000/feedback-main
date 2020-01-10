import { connect } from 'react-redux'

import selectArticleById from 'selectors/selectArticleById'
import selectEvaluationById from 'selectors/selectEvaluationById'
import selectTagsByReviewId from 'selectors/selectTagsByReviewId'
import selectUserById from 'selectors/selectUserById'

import ReviewItem from './ReviewItem'

const mapStateToProps = (state, ownProps) =>  {
  const { review } =  ownProps
  const { articleId, id, evaluationId, userId } = review

  return {
    article: selectArticleById(state, articleId),
    evaluation: selectEvaluationById(state, evaluationId),
    tags: selectTagsByReviewId(state, id),
    user: selectUserById(state, userId),
  }
}

export default connect(mapStateToProps)(ReviewItem)
