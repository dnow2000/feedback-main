import React from 'react'
import {
  ForceAtlas2,
  RelativeSize,
  Sigma
} from 'react-sigma'


import ForeignObjectNodes from './ForeignObjectNodes'


export default ({ graph }) => {
  return (
    <div className="graph">
      {graph && (
        <Sigma
          graph={graph}
          renderer="svg"
        >
          <ForeignObjectNodes />
          <RelativeSize initialSize={10}/>
          <ForceAtlas2/>
        </Sigma>
      )}
    </div>
  )
}
