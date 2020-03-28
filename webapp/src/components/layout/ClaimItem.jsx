import React from 'react'

export default ({ claim }) => {
  const { text } = claim

  return (
    <div className="claim-item">
      {text}
    </div>
  )
}
