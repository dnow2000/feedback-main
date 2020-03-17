import createCachedSelector from 're-reselect'

import selectReviewTagsByReviewId from './selectReviewTagsByReviewId'


const mapArgsToCacheKey = (state, reviewId) => reviewId || ''


export default createCachedSelector(
  state => state.data.tags,
  selectReviewTagsByReviewId,
  (tags, reviewTags) =>
    tags && tags.filter(tag =>
      reviewTags.find(reviewTag => reviewTag.tagId === tag.id))
)(mapArgsToCacheKey)
