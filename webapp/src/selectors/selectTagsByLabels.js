import createCachedSelector from 're-reselect'


const mapArgsToCacheKey = (state, labels) =>
  (labels || []).map(label => label).join('')


export default createCachedSelector(
  state => state.data.tags,
  (state, labels) => labels,
  (tags, labels) =>
    tags && tags.filter(tag => labels.includes(tag.label))
)(mapArgsToCacheKey)
