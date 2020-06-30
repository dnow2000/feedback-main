import * as d3 from 'd3-selection'
import { Component } from 'react'


export default class _ extends Component {
  constructor(props) {
      super(props)
      d3.select('#sigma-group-nodes')
        .selectAll('circle')
        .data(props.sigma.graph.nodes())
        .append('foreignObject')
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('width', 100)
        .append('xhtml:div')
        .append('div')
        .html(d => d.label)
  }

  render () {
    return null
  }
}
