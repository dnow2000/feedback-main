import React from 'react'

import Link from './Link'
import Share from './Share'


export default ({ appearance }) => {
  const { id, quotingContent, type } = appearance
  const { medium } = quotingContent || {}
  if (type === 'share') {
    return (
      <Share
        postContent={quotingContent}
        profileMedium={medium}
      />
    )
  }

  if (type === 'link') {
    return (
      <Link
        appearanceId={id}
        articleOrVideoContent={quotingContent}
      />
    )
  }
}
