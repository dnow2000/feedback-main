import React from 'react'

import Quotation from './Quotation'
import Share from './Share'


export default ({ link }) => {
  const { id, linkingContent } = link
  const { medium, type } = linkingContent || {}

  if (type === 'post') {
    return (
      <Share
        postContent={linkingContent}
        profileMedium={medium}
      />
    )
  }

  if (['article', 'video'].includes(type)) {
    return (
      <Quotation
        linkId={id}
        articleOrVideoContent={linkingContent}
      />
    )
  }

  return null
}
