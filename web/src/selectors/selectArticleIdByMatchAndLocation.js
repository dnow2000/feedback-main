import createCachedSelector from 're-reselect'

import { selectReviewById } from './selectReviewById'
import { selectVerdictById } from './selectVerdictById'
import { selectSearchFromLocation } from '../components/form/utils'

function mapArgsToCacheKey(state, match, location) {
  return location.pathname + location.search
}

export const selectArticleIdByMatchAndLocation = createCachedSelector(
  state => state.data.articles,
  (state, match) => selectReviewById(state, match.params.reviewId),
  (state, match) => selectVerdictById(state, match.params.verdictId),
  (state, match, location) => selectSearchFromLocation(location),
  (articles, review, verdict, search) =>
    (review && review.articleId) ||
    (verdict && verdict.articleId) ||
    (search && search.articleId)
)(mapArgsToCacheKey)

export default selectArticleIdByMatchAndLocation
