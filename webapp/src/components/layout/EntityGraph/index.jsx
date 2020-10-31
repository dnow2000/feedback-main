import PropTypes from 'prop-types'
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestData, selectEntitiesByKeyAndJoin } from 'redux-thunk-data'

import { edgeWithDecoration, nodeWithDecoration } from 'utils/graph'

import Graph from './Graph'


const _ = ({ children, isAnonymised, entityId, modelName }) => {
  const dispatch = useDispatch()
  const idKey = `${modelName.toLowerCase()}Id`

  const graph = useSelector(state =>
    selectEntitiesByKeyAndJoin(state, 'graphs', { [idKey]: entityId })
      .find(graph => graph.isAnonymised === isAnonymised))

  const graphWithDecoration = useMemo(() => graph && ({
    edges: graph.edges.map(edgeWithDecoration),
    nodes: graph.nodes.map(nodeWithDecoration)
  }), [graph])


  useEffect(() => {
    let apiPath = `/graphs/${idKey}/${entityId}`
    if (isAnonymised) {
      apiPath = `${apiPath}/anonymised`
    }

    dispatch(requestData({ apiPath }))
  }, [dispatch, entityId, idKey, isAnonymised])

  return (
    <Graph graph={graphWithDecoration}>
      {children}
    </Graph>
  )
}

_.defaultProps = {
  children: null,
  isAnonymised: true,
}

_.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  entityId: PropTypes.string.isRequired,
  isAnonymised: PropTypes.bool,
  modelName: PropTypes.string.isRequired,
}

export default _
