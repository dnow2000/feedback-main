import createCachedSelector from 're-reselect'
import { selectCurrentUser } from 'with-react-redux-login'

import selectCurrentUserReviewByArticleId from 'selectors/selectCurrentUserReviewByArticleId'

import selectCurrentUserTagsByArticleId from './selectCurrentUserTagsByArticleId'


const mapArgsToCacheKey  = (state, articleId) => articleId


export default createCachedSelector(
  selectCurrentUser,
  selectCurrentUserReviewByArticleId,
  (state, articleId) => articleId,
  selectCurrentUserTagsByArticleId,
  (currentUser, review, articleId, reviewTags) => ({
    reviewerId: (currentUser || {}).id,
    articleId,
    tagIds: reviewTags && reviewTags.map(tag => tag.id),
    ...review
  }))(mapArgsToCacheKey)
