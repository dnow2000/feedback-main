import { createSelector } from 'reselect'

export const selectTrendings = createSelector(
  state => state.data.trendings,
  trendings => {
    const filteredTrendings = [...trendings]

    return filteredTrendings
  }
)

export default selectTrendings
