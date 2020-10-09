import React from 'react'

import Citation from './Citation'
import Share from './Share'


export default ({ appearance }) => {
  const { id, quotingContent } = appearance
  const { medium, type } = quotingContent || {}
  
  if (type === 'post') {
    return (
      <Share
        postContent={quotingContent}
        profileMedium={medium}
      />
    )
  }

  if (['article', 'video'].includes(type)) {
    return (
      <Citation
        appearanceId={id}
        articleOrVideoContent={quotingContent}
      />
    )
  }

  return null
}
