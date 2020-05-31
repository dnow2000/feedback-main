import React from 'react'

import Ctas from 'components/layout/Ctas'


export default ({ children, claim }) => {
  const { text } = claim || {}

  return (
    <div className="claim-item">
      {text}
      <Ctas>
        {children}
      </Ctas>
    </div>
  )
}
