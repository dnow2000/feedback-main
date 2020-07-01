
import { scaleLinear } from 'd3-scale'
import { UndirectedGraph } from 'graphology'
import circularLayout from 'graphology-layout/circular'
import complete from 'graphology-generators/classic/complete'
import randomLayout from 'graphology-layout/random'
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
    const g = complete(UndirectedGraph, {order: 10})
    randomLayout.assign(g)

    g.nodes().forEach(node => {
      const attr = g.getNodeAttributes(node)
      g.mergeNodeAttributes(node, {
        label: 'foo',
        size: Math.max(4, Math.random() * 10),
        color: 'black'
      })
    })

    const renderer = new WebGLRenderer(g, graphRef.current)
    window.graph = g;
    window.renderer = renderer;
    window.camera = renderer.camera;
    */


    const initial = {}

    nodes.forEach(node => {
      initial[node.id] = {
        x: node.x,
        y: node.y,
      }
    })

    const circle = circularLayout(undirectedGraph)

    let state: boolean = false

    animateNodes(undirectedGraph, circle, { duration: 2000 })

  }, [graph, graphRef])

  return (
    <div
      className="graph"
      ref={graphRef}
    />
  )
}
