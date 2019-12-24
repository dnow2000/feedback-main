import { getStateKeyFromConfig } from 'fetch-normalize-data'

import selectEntitiesByKeyAndActivityTags from 'selectors/selectEntitiesByKeyAndActivityTags'


export const selectItems = (state, config) => {
  const stateKey = getStateKeyFromConfig(config)
  const activityTag = `/${stateKey}`
  return selectEntitiesByKeyAndActivityTags(state, stateKey, [activityTag])
}


export const selectRequest = (state, config) => {
  const activityTag = `/${getStateKeyFromConfig(config)}`
  return state.requests[activityTag]
}
