import createCachedSelector from 're-reselect'

function mapArgsToCacheKey(state, texts) {
  return (texts || []).map(text => text).join('')
}

export const selectTagsByTexts = createCachedSelector(
  state => state.data.tags,
  (state, texts) => texts,
  (tags, texts) =>
    tags.filter(tag => texts.includes(tag.text))
)(mapArgsToCacheKey)

export default selectTagsByTexts
