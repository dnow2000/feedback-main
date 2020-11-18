import createCachedSelector from 're-reselect'


const mapArgsToCacheKey = (state, featureName) => featureName || ''


export default createCachedSelector(
  state => state.data.features,
  (state, featureName) => featureName,
  (features, featureName) => {
    const selectedFeature = (features || []).find(feature => feature.nameKey === featureName)
    if (!selectedFeature) {
      return true
    }
    return !selectedFeature.isActive
  }
)(mapArgsToCacheKey)
