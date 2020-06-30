import * as d3Force from 'd3-force'
import * as d3Selection from 'd3-selection'
import React, { useEffect, useRef } from 'react'


export default ({ graph }) => {
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
    const chartWidth = width - (margin.left+margin.right)
    const chartHeight = height - (margin.top+margin.bottom)
    svg.attr('width', width)
       .attr('height', height)
    chartLayer.attr('width', chartWidth)
              .attr('height', chartHeight)
              .attr('transform', "translate("+[margin.left, margin.top]+")")

    const simulation = d3Force.forceSimulation()
            .force('link', d3Force.forceLink().id(function(d) { return d.id }))
            .force('collide', d3Force.forceCollide( function(d){ return d.size + 8 }).iterations(16) )
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

    /*
    const node = svg.append('g')
            .attr('class', 'nodes')
            .selectAll('rect')
            .data(nodes)
            .enter()
            .append('rect')
            .attr('width', 100)
            .attr('height',10)
    */

    const node = svg.append('g')
            .attr('class', 'nodes')
            .selectAll('foreignObject')
            .data(nodes)
            .enter()
            .append('g')

    /*
    node.append('rect')
        .attr('width', 100)
        .attr('height',10)
        .attr('x', 0)
        .attr('y', 0)
    */

    node.append('foreignObject')
        .attr('width', 100)
        .attr('height', 100)
        .append('xhtml:div')
        .html('<div> TEST </div>')

            //

    //node.append('circle')
    //    .attr('r', function(d){ return d.size })


            /*
            .attr('width',10)
            .attr('height',10)
            .attr('x', function(d) { return d.x })
            .attr('y', function(d) { return d.y })
            .style('fill', 'red')
            */
    //const
            //.append('foreignObject')
            //.attr('width', 100)
            //.attr('height', 10)
            //.append('xhtml:div')
            //.html('<h1>An HTML Foreign Object in SVG</h1><p>Lorem </p>.');



    const ticked = function() {
      link.attr('x1', function(d) { return d.source.x })
          .attr('y1', function(d) { return d.source.y })
          .attr('x2', function(d) { return d.target.x })
          .attr('y2', function(d) { return d.target.y })

      //node.attr('x', function(d) { return d.x })
      //    .attr('y', function(d) { return d.y })
      node.attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")"; });
    }

    simulation.nodes(nodes)
              .on('tick', ticked)


    simulation.force('link')
              .links(edges)
  }, [graph, graphRef])


  return (
    <div
      className="graph"
      ref={graphRef}
    >
    </div>
  )
}
