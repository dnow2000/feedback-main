import createCachedSelector from 're-reselect'
import { selectCurrentUser } from 'with-react-redux-login'


const mapArgsToCacheKey = (state, articleId) => articleId || ''


export default createCachedSelector(
  state => state.data.reviews,
  selectCurrentUser,
  (state, articleId) => articleId,
  (reviews, currentUser, articleId) =>
    reviews && reviews.find(review =>
      review.articleId === articleId &&
      review.reviewerId === (currentUser && currentUser.id))
)(mapArgsToCacheKey)
