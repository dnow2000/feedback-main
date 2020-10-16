import { UndirectedGraph } from 'graphology'
import forceAtlas2 from 'graphology-layout-forceatlas2'
import PropTypes from 'prop-types'
import { WebGLRenderer } from 'sigma'
import React, { useEffect, useRef } from 'react'


const _ = ({ children, graph, onGraphMount }) => {
  const graphRef = useRef()

  useEffect(() => {
    if (!graph) return
    const { edges, nodes } = graph
    const undirectedGraph = new UndirectedGraph()

    nodes.forEach(node =>
      undirectedGraph.addNode(node.id, node))

    edges.forEach(edge =>
      undirectedGraph.addEdge(edge.source,
                              edge.target,
                              { color: "#ccc" }))

    const renderer = new WebGLRenderer(undirectedGraph, graphRef.current)

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

  }, [graph, graphRef, onGraphMount])

  return (
    <div
      className="graph"
      ref={graphRef}
    >
      {children}
    </div>
  )
}


_.defaultProps = {
  children: null,
  onGraphMount: null
}

_.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  graph: PropTypes.shape().isRequired,
  onGraphMount: PropTypes.func
}


export default _
