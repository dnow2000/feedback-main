import React from 'react'

import Interaction from './Interaction'
import Link from './Link'


export default ({ appearance }) => {
  const { quotingContent, type } = appearance
  const { medium } = quotingContent
  if (type === 'interaction') {
    return (
      <Interaction
        postContent={quotingContent}
        profileMedium={medium}
      />
    )
  }

  if (type === 'link') {
    return (
      <Link articleOrVideoContent={quotingContent} />
    )
  }
}
