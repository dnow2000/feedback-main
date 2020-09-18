import createCachedSelector from 're-reselect'

import selectVerdictReviewersByVerdictId from './selectVerdictReviewersByVerdictId'


const mapArgsToCacheKey = (state, collectionName, entityId) =>
  `${collectionName || ''} ${entityId || ''}`


export default createCachedSelector(
  state => state.data.graphs,
  (state, collectionName) => collectionName,
  (state, collectionName, entityId) => entityId,
  (graphs, collectionName, entityId) => (graphs || []).find(graph =>
    graph.collectionName === collectionName &&
    graph.entityId === entityId)
)(mapArgsToCacheKey)
