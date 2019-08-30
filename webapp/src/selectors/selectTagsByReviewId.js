import createCachedSelector from 're-reselect'

import selectReviewTagsByReviewId from './selectReviewTagsByReviewId'

function mapArgsToCacheKey(state, reviewId) {
  return reviewId || ''
}

const selectTagsByReviewId = createCachedSelector(
  state => state.data.tags,
  selectReviewTagsByReviewId,
  (tags, reviewTags) =>
    tags.filter(tag =>
      reviewTags.find(reviewTag => reviewTag.tagId === tag.id))
)(mapArgsToCacheKey)

export default selectTagsByReviewId
