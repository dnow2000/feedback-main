import { connect } from 'react-redux'
import { compose } from 'redux'
import withQueryRouter from 'with-query-router'

import selectReviewsByArticleId from 'selectors/selectReviewsByArticleId'

import ReviewsExploration from './ReviewsExploration'

const mapStateToProps = (state, ownProps) => {
  const { query } = ownProps
  const queryParams = query.parse()
  const { articleId } = queryParams
  return {
    reviews: selectReviewsByArticleId(state, articleId),
  }
}

export default compose(
  withQueryRouter(),
  connect(mapStateToProps)
)(ReviewsExploration)
