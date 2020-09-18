import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { requestData } from 'redux-thunk-data'

import Graph from 'components/layout/Graph'
import Node from 'components/layout/Node'
import Header from 'components/layout/Header'
import Main from 'components/layout/Main'


export default () => {
  const dispatch = useDispatch()
  const { collectionName, entityId } = useParams()

  const [tooltips, setTooltips] = useState(null)

  const graphs = useSelector(state => state.data.graphs) || []


  const handleGraphMount = useCallback(({ renderer, undirectedGraph }) => {
    const tooltips = Object.keys(renderer.nodeDataCache)
                           .map(nodeId => {
      const datum = renderer.nodeDataCache[nodeId]
      const pos = renderer.camera.graphToViewport(renderer, datum.x, datum.y)
      const node = undirectedGraph.getNodeAttributes(nodeId)

      const nodeElement = <Node node={node} />
      if (!nodeElement) return null

      const style = {
        left: `${pos.x}px`,
        top: `${pos.y}px`
      }

      return (
        <div
          className='tooltip'
          key={nodeId}
          style={style}
        >
          {nodeElement}
        </div>
      )
    })
    setTooltips(tooltips)
  }, [setTooltips])


  useEffect(() => {
    let apiPath = '/graphs'
    if (collectionName && entityId) {
      apiPath = `${apiPath}/${collectionName}/${entityId}`
    }
    dispatch(requestData({ apiPath }))
  }, [collectionName, dispatch, entityId])


  return (
    <>
      <Header />
      <Main className="exploration with-header">
        <div className="container">
          <Graph
            graph={graphs[0]}
            onGraphMount={handleGraphMount}
          >
            {tooltips}
          </Graph>
        </div>
      </Main>
    </>
  )
}
