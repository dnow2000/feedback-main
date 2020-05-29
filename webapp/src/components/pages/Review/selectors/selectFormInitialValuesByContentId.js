import createCachedSelector from 're-reselect'
import { selectCurrentUser } from 'with-react-redux-login'

import selectCurrentUserReviewByContentId from 'selectors/selectCurrentUserReviewByContentId'

import selectCurrentUserTagsByContentId from './selectCurrentUserTagsByContentId'


const mapArgsToCacheKey  = (state, contentId) => contentId


export default createCachedSelector(
  selectCurrentUser,
  selectCurrentUserReviewByContentId,
  (state, contentId) => contentId,
  selectCurrentUserTagsByContentId,
  (currentUser, review, contentId, reviewTags) => ({
    reviewerId: (currentUser || {}).id,
    contentId,
    tagIds: reviewTags && reviewTags.map(tag => tag.id),
    ...review
  }))(mapArgsToCacheKey)
