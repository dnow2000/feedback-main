import React from 'react'

import Link from './Link'
import Share from './Share'


export default ({ appearance }) => {
  const { quotingContent, type } = appearance
  const { medium } = quotingContent
  if (type === 'share') {
    return (
      <Share
        postContent={quotingContent}
        profileMedium={medium}
      />
    )
  }

  if (type === 'link') {
    console.log({appearance})
    return (
      <Link articleOrVideoContent={quotingContent} />
    )
  }
}
