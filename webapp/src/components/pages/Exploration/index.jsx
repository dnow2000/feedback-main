import React, { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'

import EntityGraph from 'components/layout/EntityGraph'
import Node from 'components/layout/Node'
import Header from 'components/layout/Header'
import Main from 'components/layout/Main'


export default () => {
  const { collectionName, entityId } = useParams()

  const [tooltips, setTooltips] = useState(null)

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


  return (
    <>
      <Header />
      <Main className="exploration with-header">
        <div className="container">
          <EntityGraph
            collectionName={collectionName}
            entityId={entityId}
            onGraphMount={handleGraphMount}
          >
            {tooltips}
          </EntityGraph>
        </div>
      </Main>
    </>
  )
}
