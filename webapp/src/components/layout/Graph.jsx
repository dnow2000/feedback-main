import React from 'react'
import { Sigma } from 'react-sigma'


export default ({ graph }) => {
  return (
    <div className="graph">
      {graph && <Sigma graph={graph}/>}
    </div>
  )
}
