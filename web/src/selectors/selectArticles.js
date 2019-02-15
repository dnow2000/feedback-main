import moment from 'moment'
import { createSelector } from 'reselect'

export const selectArticles = createSelector(
  state => state.data.articles,
  articles => {
    const filteredArticles = [...articles]

    filteredArticles.sort(
      (a1, a2) => moment(a2.dateCreated) - moment(a1.dateCreated)
    )

    return filteredArticles
  }
)

export default selectArticles
