import createCachedSelector from 're-reselect'


const mapArgsToCacheKey = (state, texts) =>
  (texts || []).map(text => text).join('')


const selectTagsByTexts = createCachedSelector(
  state => state.data.tags,
  (state, texts) => texts,
  (tags, texts) =>
    tags && tags.filter(tag => texts.includes(tag.text))
)(mapArgsToCacheKey)
