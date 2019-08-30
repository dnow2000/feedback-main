import createCachedSelector from 're-reselect'

import selectUserTagsByUserId from './selectUserTagsByUserId'

function mapArgsToCacheKey(state, userId) {
  return userId || ''
}

const selectTagsByUserId = createCachedSelector(
  state => state.data.tags,
  selectUserTagsByUserId,
  (tags, userTags) => {
    const userTagIds = userTags.map(userTag => userTag.tagId)
    return tags.filter(tag => userTagIds.includes(tag.id))
  }
)(mapArgsToCacheKey)

export default selectTagsByUserId
