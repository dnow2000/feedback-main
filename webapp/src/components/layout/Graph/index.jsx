import React from 'react'
import {
  ForceAtlas2,
  RelativeSize,
  Sigma
} from 'react-sigma'


import Nodes from './Nodes'


export default ({ graph }) => {
  return (
    <div className="graph">
      {graph && (
        <Sigma
          graph={graph}
          renderer="svg"
        >
          <Nodes />
          <RelativeSize initialSize={10}/>
          <ForceAtlas2/>
        </Sigma>
      )}
    </div>
  )
}
