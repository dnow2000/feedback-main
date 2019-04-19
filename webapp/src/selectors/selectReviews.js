import moment from 'moment'
import { createSelector } from 'reselect'

export const selectReviews = createSelector(
  state => state.data.reviews,
  reviews => {
    const filteredReviews = [...reviews]

    filteredReviews.sort(
      (a1, a2) => moment(a2.dateCreated) - moment(a1.dateCreated)
    )

    return filteredReviews
  }
)

export default selectReviews
