import { UndirectedGraph } from 'graphology'
import forceAtlas2 from 'graphology-layout-forceatlas2'
import PropTypes from 'prop-types'
import { WebGLRenderer } from 'sigma'
import React, { useEffect, useRef, useState } from 'react'

import Spinner from 'components/layout/Spinner'


const _ = ({ children, graph, onGraphMount }) => {
  const graphRef = useRef()
  const [renderer, setRenderer] = useState()
  const [undirectedGraph, setUndirectedGraph] = useState()

  useEffect(() => {
    const undirectedGraph = new UndirectedGraph()
    setUndirectedGraph(undirectedGraph)
    setRenderer(new WebGLRenderer(undirectedGraph, graphRef.current))
  }, [graphRef, setRenderer, setUndirectedGraph])

  useEffect(() => {
    if (!graph || !undirectedGraph) return
    const { edges, nodes } = graph

    nodes.forEach(node =>
      !undirectedGraph.hasNode(node.id)
      && undirectedGraph.addNode(node.id, node))

    edges.forEach(edge =>
      !undirectedGraph.hasEdge(edge.source, edge.target)
      && undirectedGraph.addEdge(edge.source,
                                 edge.target,
                                 { color: "#ccc" }))

    const settings = forceAtlas2.inferSettings(undirectedGraph)
    forceAtlas2.assign(undirectedGraph, {
      iterations: 100,
      settings,
    })

    if (onGraphMount) {
      setTimeout(() => onGraphMount({ graphRef, renderer, undirectedGraph }))
    }

    return () => {
      renderer.clear()
    }

  }, [graph, graphRef, onGraphMount, renderer, undirectedGraph])

  return (
    <div
      className="graph"
      ref={graphRef}
    >
      {!graph && <Spinner />}
      {children}
    </div>
  )
}


_.defaultProps = {
  children: null,
  graph: null,
  onGraphMount: null
}

_.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  graph: PropTypes.shape(),
  onGraphMount: PropTypes.func
}


export default _
