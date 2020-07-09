import { UndirectedGraph } from 'graphology'
import forceAtlas2 from "graphology-layout-forceatlas2"
import { WebGLRenderer } from 'sigma'
import React, { useEffect, useRef } from 'react'


export default ({ children, graph, onNodeEnter }) => {
  const graphRef = useRef()
  const tooltipRef = useRef()

  useEffect(() => {
    if (!graph) return
    const { edges, nodes } = graph
    const undirectedGraph = new UndirectedGraph()

    nodes.forEach(node => {
      undirectedGraph.addNode(node.id, node)
    })

    edges.forEach(edge => {
      undirectedGraph.addEdge(edge.source,
                              edge.target,
                              { color: "#ccc" })
    })

    const renderer = new WebGLRenderer(undirectedGraph, graphRef.current)

    renderer.on('enterNode', ({ node: nodeId }) => {
      const node = undirectedGraph.getNodeAttributes(nodeId)
      tooltipRef.current.style.top = `${(graphRef.current.clientHeight/2) - node.y}px`
      tooltipRef.current.style.left = `${(graphRef.current.clientWidth/2) + node.x}px`
    })

    forceAtlas2.assign(undirectedGraph, {
      iterations: 100,
      settings: forceAtlas2.inferSettings(undirectedGraph),
    })

  }, [graph, graphRef, onNodeEnter, tooltipRef])


  return (
    <div
      className="graph"
      ref={graphRef}
    >
      <div
        className="tooltip"
        ref={tooltipRef}
      >
        Hello Sigma !
      </div>
    </div>
  )
}
