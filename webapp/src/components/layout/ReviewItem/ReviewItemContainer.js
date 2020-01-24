import { connect } from 'react-redux'
import { selectEntityByKeyAndId } from 'redux-thunk-data'

import selectTagsByReviewId from 'selectors/selectTagsByReviewId'

import ReviewItem from './ReviewItem'

const mapStateToProps = (state, ownProps) =>  {
  const { review } =  ownProps
  const { articleId, id, evaluationId, userId } = review

  return {
    article: selectEntityByKeyAndId(state, 'articles', articleId),
    evaluation: selectEntityByKeyAndId(state, 'evaluations', evaluationId),
    tags: selectTagsByReviewId(state, id),
    user: selectEntityByKeyAndId(state, 'users', userId),
  }
}

export default connect(mapStateToProps)(ReviewItem)
