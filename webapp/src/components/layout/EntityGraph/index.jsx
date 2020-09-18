import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestData } from 'redux-thunk-data'

import selectGraphByCollectionNameAndEntityId from 'selectors/selectGraphByCollectionNameAndEntityId'

import Graph from './Graph'


const _ = ({ children, collectionName, entityId }) => {
  const dispatch = useDispatch()

  const graph = useSelector(state =>
    selectGraphByCollectionNameAndEntityId(state, collectionName, entityId))


  useEffect(() => {
    let apiPath = '/graphs'
    if (collectionName && entityId) {
      apiPath = `${apiPath}/${collectionName}/${entityId}`
    }
    dispatch(requestData({ apiPath }))
  }, [collectionName, dispatch, entityId])


  if (!graph) return null

  return (
    <Graph graph={graph}>
      {children}
    </Graph>
  )
}


_.defaultProps = {
  children: null,
  collectionName: null,
  entityId: null
}

_.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  collectionName: PropTypes.string,
  entityId: PropTypes.string
}

export default _
