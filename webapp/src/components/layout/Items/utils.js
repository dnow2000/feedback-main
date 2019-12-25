import { getStateKeyFromConfig } from 'fetch-normalize-data'

import selectEntitiesByKeyAndActivityTags from 'selectors/selectEntitiesByKeyAndActivityTags'


export const getItemsActivityTagFromConfig = config =>
  `/${getStateKeyFromConfig(config)}-items`


export const selectItems = (state, config) =>
  selectEntitiesByKeyAndActivityTags(
    state,
    getStateKeyFromConfig(config),
    [getItemsActivityTagFromConfig(config)]
  )


export const selectRequest = (state, config) =>
  state.requests[getItemsActivityTagFromConfig(config)]
