import createCachedSelector from 're-reselect'
import { selectCurrentUser } from 'with-react-redux-login'


const mapArgsToCacheKey = (state, userId, articleId) =>
  `${userId || ''}/${articleId || ''}`


export default createCachedSelector(
  state => state.data.reviews,
  selectCurrentUser,
  (state, articleId) => articleId,
  (reviews, user, articleId) =>
    reviews && reviews.find(review =>
      review.articleId === articleId && review.userId === (user && user.id))
)(mapArgsToCacheKey)
