import createCachedSelector from 're-reselect'

import selectVerdictReviewersByVerdictId from './selectVerdictReviewersByVerdictId'


const mapArgsToCacheKey = (state, verdictId) => verdictId || ''


export default createCachedSelector(
  state => state.data.users,
  selectVerdictReviewersByVerdictId,
  (users, verdictReviewers) => users && verdictReviewers && users.filter(user =>
    verdictReviewers.find(verdictReviewer =>
      verdictReviewer.reviewerId === user.id))
)(mapArgsToCacheKey)
