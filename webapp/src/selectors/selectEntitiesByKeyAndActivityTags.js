import createCachedSelector from 're-reselect'


const mapArgsToCacheKey = (state, key, tags) =>
  `${key} ${tags.map(tag => tag).join(' ')}`


export default createCachedSelector(
  (state, key) => state.data[key],
  (state, key, tags) => tags,
  (entities, tags) => {
    if (!entities) return
    const tagsLength = tags.length
    return entities.filter(entity =>
      tagsLength === entity.__ACTIVITIES__.length
      && tags.every(tag => entity.__ACTIVITIES__.includes(tag)))
  }
)(mapArgsToCacheKey)
