import {
  selectArticleById,
  selectReviewsByArticleIdAndVerdictId,
  selectUserById,
} from '../../../../selectors'

function mapStateToProps(state, ownProps) {
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

export default mapStateToProps
