import createCachedSelector from 're-reselect'

import selectUserTagsByUserId from './selectUserTagsByUserId'


const mapArgsToCacheKey = (state, userId) => userId || ''


export default createCachedSelector(
  state => state.data.tags,
  selectUserTagsByUserId,
  (tags, userTags) => {
    if (!userTags) return
    const userTagIds = userTags.map(userTag => userTag.tagId)
    return tags.filter(tag => userTagIds.includes(tag.id))
  }
)(mapArgsToCacheKey)
