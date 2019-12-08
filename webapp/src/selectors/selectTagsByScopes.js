import createCachedSelector from 're-reselect'

function mapArgsToCacheKey(state, scopeTypes) {
  return (scopeTypes || []).map(scopeType => scopeType).join('')
}

const selectTagsByScopes = createCachedSelector(
  state => state.data.tags,
  (state, scopeTypes) => scopeTypes,
  (tags, scopeTypes) => {
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

export default selectTagsByScopes
