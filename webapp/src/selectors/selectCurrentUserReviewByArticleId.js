import createCachedSelector from 're-reselect'
import { selectCurrentUser } from 'with-react-redux-login'

function mapArgsToCacheKey(state, userId, articleId) {
  return `${userId || ''}/${articleId || ''}`
}

export const selectCurrentUserReviewByArticleId = createCachedSelector(
  state => state.data.reviews,
  selectCurrentUser,
  (state, articleId) => articleId,
  (reviews, user, articleId) =>
    reviews.find(
      review => review.articleId === articleId && review.userId === (user && user.id)
    )
)(mapArgsToCacheKey)

export default selectCurrentUserReviewByArticleId
