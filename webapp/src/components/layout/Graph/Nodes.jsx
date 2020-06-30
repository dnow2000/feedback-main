import { Component } from 'react'


class _ extends Component {
  constructor(props) {
      super(props)


      //const svg = document.querySelector('.sigma-svg')
      //const nodesGroup = document.querySelector('#sigma-group-nodes')
      const nodes = props.sigma.graph.nodes()

      //console.log(props.sigma.renderers)
      nodes.forEach(node => {
        //const el = document.querySelector(`[data-node-id=${node.id}]`)
        //console.log({el}, node)
        //console.log(node)
        node.color = 'green'
        /*
        const nodeGroup = document.createElement("rect")
        nodeGroup.setAttribute('x', el.attributes.cx.value)
        nodeGroup.setAttribute('y', el.attributes.cy.value)
        nodeGroup.setAttribute('height', 100)
        nodeGroup.setAttribute('width', 100)

        nodesGroup.replaceChild(nodeGroup, el)
        */
        //node.type = 'square'
        //nodesGroup.append(nodeGroup)

        //nodesGroup.removeChild(el)
        //console.log({el}, el.attributes.x)
        // const f = document.createElement("foreignObject")
        //f.setAttribute('x', el.attributes.cx)
        //f.setAttribute('y', el.attributes.cy)
        //f.setAttribute('height', 100)
        //f.setAttribute('width', 100)
        //f.innerHTML = `
        //    <div xmlns="http://www.w3.org/1999/xhtml">
        //      SALUT
        //    </div>
        //`
        //nodesGroup.append(f)

        //console.log({el})
      })
      //props.sigma.refresh()

      /*
      nodes.forEach(node => {
        const nextEl = document.createElement("foreignObject")
        nextEl.setAttribute('data-node-id', node.id)
        nextEl.innerHTML = `
          <div>
            SALUT
          </div>
        `
        //console.log({nextEl})
        nodesGroup.addChild(nextEl)
      })
      */
  }

  render () {
    return null
  }
}


export default _
