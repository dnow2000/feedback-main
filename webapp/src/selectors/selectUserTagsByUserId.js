import createCachedSelector from 're-reselect'


const mapArgsToCacheKey = (state, userId) => userId || ''


export default createCachedSelector(
  state => state.data.userTags,
  (state, userId) => userId,
  (userTags, userId) =>
    userTags && userTags.filter(userTag => userTag.userId === userId)
)(mapArgsToCacheKey)
