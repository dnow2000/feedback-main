import createCachedSelector from 're-reselect'

import selectSortedAppearancesByVerdictId from './selectSortedAppearancesByVerdictId'


const mapArgsToCacheKey = (state, verdictId) => verdictId || ''


export default createCachedSelector(
  selectSortedAppearancesByVerdictId,
  appearances =>
    appearances?.map(appearance => appearance.quotingContent.totalShares)
                .reduce((a, b) => a + b, 0))(mapArgsToCacheKey)
