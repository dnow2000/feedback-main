import createCachedSelector from 're-reselect'

function mapArgsToCacheKey(state, scopeTypes) {
  return (scopeTypes || []).map(scopeType => scopeType).join('')
}

export const selectTagsByScopes = createCachedSelector(
  state => state.data.tags,
  (state, scopeTypes) => scopeTypes,
  (tags, scopeTypes) =>
    tags.filter(tag =>
        tag.scopes.find(scope =>
            scopeTypes.includes(scope.type)
        )
    )
)(mapArgsToCacheKey)

export default selectTagsByScopes
