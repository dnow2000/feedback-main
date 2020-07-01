import * as d3Force from 'd3-force'
import * as d3Selection from 'd3-selection'
import React, { useEffect, useRef } from 'react'
import { renderToString } from 'react-dom/server'

export default ({
  componentAccessor,
  heightAccessor,
  graph,
  widthAccessor
}) => {
  const graphRef = useRef()

  useEffect(() => {
    if (!graph) return
    const { edges, nodes } = graph

    const svg = d3Selection.select(graphRef.current).append('svg')
    const chartLayer = svg.append('g')
                          .classed('chartLayer', true)

    const width = graphRef.current.clientWidth
    const height = graphRef.current.clientHeight
    const margin = { bottom: 0, left: 0, right: 0, top: 0 }
    const chartWidth = width - (margin.left + margin.right)
    const chartHeight = height - (margin.top + margin.bottom)
    svg.attr('width', width)
       .attr('height', height)
    chartLayer.attr('width', chartWidth)
              .attr('height', chartHeight)
              .attr('transform', "translate("+[margin.left, margin.top]+")")

    const simulation = d3Force.forceSimulation()
            .force('link', d3Force.forceLink().id(function(d) { return d.id }))
            .force('collide', d3Force.forceCollide(widthAccessor).iterations(16))
            .force('charge', d3Force.forceManyBody())
            .force('center', d3Force.forceCenter(chartWidth / 2, chartHeight / 2))
            .force('y', d3Force.forceY(0))
            .force('x', d3Force.forceX(0))

    const link = svg.append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(edges)
            .enter()
            .append('line')
            .attr('stroke', 'black')

    const node = svg.append('g')
            .attr('class', 'nodes')
            .selectAll('foreignObject')
            .data(nodes)
            .enter()
            .append('g')
    node.append('foreignObject')
        .attr('width', widthAccessor)
        .attr('height', heightAccessor)
        .append('xhtml:div')
        .html(d => {
          return renderToString(componentAccessor(d))
        })

    const ticked = function() {
      link.attr('x1', function(d) { return d.source.x })
          .attr('y1', function(d) { return d.source.y })
          .attr('x2', function(d) { return d.target.x })
          .attr('y2', function(d) { return d.target.y })
      node.attr('transform', function(d) {return "translate(" + d.x + "," + d.y + ")"; });
    }

    simulation.nodes(nodes)
              .on('tick', ticked)

    simulation.force('link')
              .links(edges)
  }, [componentAccessor, graph, graphRef, widthAccessor])


  return (
    <div
      className="graph"
      ref={graphRef}
    >
    </div>
  )
}
