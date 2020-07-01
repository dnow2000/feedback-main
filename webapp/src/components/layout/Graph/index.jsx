
import { scaleLinear } from 'd3-scale'
import { UndirectedGraph } from 'graphology'
import circlepackLayout from 'graphology-layout/circlepack'
import forceAtlas2 from "graphology-layout-forceatlas2"
import { WebGLRenderer } from 'sigma'
import { animateNodes } from 'sigma/animate'
import extent from 'simple-statistics/src/extent'
import React, { useEffect, useRef } from 'react'


export default ({ graph }) => {
  const graphRef = useRef()

  useEffect(() => {
    if (!graph) return
    const { edges, nodes } = graph
    const nodeSizeExtent = extent(nodes.map(node => node.size))
    const xExtent = extent(nodes.map(node => node.x))
    const yExtent = extent(nodes.map(node => node.y))
    const nodeSizeScale = scaleLinear().domain(nodeSizeExtent).range([3, 15])
    const xScale = scaleLinear().domain(xExtent).range([0, 1])
    const yScale = scaleLinear().domain(yExtent).range([0, 1])

    const undirectedGraph = new UndirectedGraph()

    nodes.forEach(node => {
      const undirectedNode = {
        ...node,
        size: nodeSizeScale(node.size),
        x: xScale(node.x),
        y: yScale(node.y)
      }
      undirectedGraph.addNode(node.id, undirectedNode)
    })

    edges.forEach(edge => {
      undirectedGraph.addEdge(edge.source,
                              edge.target,
                              { color: "#ccc" })
    })

    const renderer = new WebGLRenderer(undirectedGraph, graphRef.current)

    /*
    const layout = forceAtlas2(undirectedGraph, {
      iterations: 100,
      settings: forceAtlas2.inferSettings(undirectedGraph),
    })
    animateNodes(undirectedGraph,
                 layout,
                 { duration: 2000 })
    */

    const layout = forceAtlas2.assign(undirectedGraph, {
      iterations: 100,
      settings: forceAtlas2.inferSettings(undirectedGraph),
    })



  }, [graph, graphRef])

  return (
    <div
      className="graph"
      ref={graphRef}
    />
  )
}
