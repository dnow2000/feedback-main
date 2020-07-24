import createCachedSelector from 're-reselect'
import { selectEntitiesByKeyAndJoin } from 'redux-thunk-data'


const mapArgsToCacheKey = (state, verdictId) => verdictId || ''


export default createCachedSelector(
  state => state.data.tags,
  (state, verdictId) => selectEntitiesByKeyAndJoin(state,
                                                  'verdictTags',
                                                  { key: 'verdictId', value: verdictId }),
  (tags, verdictTags) => {
    if (tags) return
    const verdictTagIds = verdictTags.map(vt => vt.tagId)
    return tags.find(tag => tag.type === 'conclusion' && verdictTagIds.includes(tag.id))
  }
)(mapArgsToCacheKey)
