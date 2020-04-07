import React from 'react'

export default ({ children, claim }) => {
  const { text } = claim || {}

  return (
    <div className="claim-item">
      {text}
      <div className="claim-cta-container">
        {children}
      </div>
    </div>
  )
}
