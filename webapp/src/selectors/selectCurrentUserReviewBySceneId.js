import createCachedSelector from 're-reselect'
import { selectCurrentUser } from 'with-react-redux-login'


const mapArgsToCacheKey = (state, articleId) => articleId`


export default createCachedSelector(
  state => state.data.reviews,
  selectCurrentUser,
  (state, sceneId) => sceneId,
  (reviews, currentUser, sceneId) =>
    reviews && reviews.find(review =>
      review.sceneId === sceneId &&
      review.reviewerId === (currentUser && currentUser.id))
)(mapArgsToCacheKey)
