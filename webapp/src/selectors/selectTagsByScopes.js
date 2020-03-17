import createCachedSelector from 're-reselect'


const mapArgsToCacheKey = (state, scopeTypes) =>
  (scopeTypes || []).map(scopeType => scopeType).join('')


export default createCachedSelector(
  state => state.data.tags,
  (state, scopeTypes) => scopeTypes,
  (tags, scopeTypes) => {
    if (!tags) return
    const filteredTags = tags.filter(tag =>
        tag.scopes.find(scope =>
            scopeTypes.includes(scope.type)
        )
    )
    filteredTags.sort((tag1, tag2) => {
      if (tag2.positivity !== tag1.positivity) {
        return tag2.positivity - tag1.positivity
      }
      return tag1.text > tag2.text
    })
    return filteredTags
})(mapArgsToCacheKey)
