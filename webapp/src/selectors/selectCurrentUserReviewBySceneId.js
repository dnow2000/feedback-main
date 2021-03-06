import createCachedSelector from 're-reselect'
import { selectCurrentUser } from 'with-react-redux-login'


const mapArgsToCacheKey = (state, articleId) => articleId`


export default createCachedSelector(
  state => state.data.reviews,
  selectCurrentUser,
  (state, contentId) => contentId,
  (reviews, currentUser, contentId) =>
    reviews && reviews.find(review =>
      review.contentId === contentId &&
      review.reviewerId === (currentUser && currentUser.id))
)(mapArgsToCacheKey)
