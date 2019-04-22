import createCachedSelector from 're-reselect'

import { selectCurrentUserReviewByArticleId } from '../../../selectors/selectCurrentUserReviewByArticleId'
import { selectCurrentUserTagsByArticleId } from '../../../selectors/selectCurrentUserTagsByArticleId'

function mapArgsToCacheKey(state, userId, articleId) {
  return `${userId || ''}/${articleId || ''}`
}

export const selectFormInitialValuesByArticleId = createCachedSelector(
  selectCurrentUserReviewByArticleId,
  (state, articleId) => articleId,
  selectCurrentUserTagsByArticleId,
  (review, articleId, tags) => {

    const tagIds = tags && tags.map(tag => tag.id)

    const formInitialValues = Object.assign({
      articleId,
      tagIds
    }, review)

    return formInitialValues
  }
)(mapArgsToCacheKey)

export default selectFormInitialValuesByArticleId
