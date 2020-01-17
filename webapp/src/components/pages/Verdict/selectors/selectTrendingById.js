import { createSelector } from 'reselect'

export default createSelector(
  state => state.data.trendings,
  (state, trendingId) => trendingId,
  (trendings, trendingId) => trendings.find(trending => trending.id === trendingId)
)
