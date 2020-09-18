import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestData } from 'redux-thunk-data'


import Graph from './Graph'


const _ = ({ children, collectionName, entityId }) => {
  const dispatch = useDispatch()

  const graphs = useSelector(state => state.data.graphs) || []


  useEffect(() => {
    let apiPath = '/graphs'
    if (collectionName && entityId) {
      apiPath = `${apiPath}/${collectionName}/${entityId}`
    }
    dispatch(requestData({ apiPath }))
  }, [collectionName, dispatch, entityId])


  return (
    <Graph graph={graphs[0]}>
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
