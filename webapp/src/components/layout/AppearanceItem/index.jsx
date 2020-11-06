import PropTypes from 'prop-types'
import React from 'react'

import Quotation from './Quotation'
import Share from './Share'


 const _ = ({ appearance }) => {
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
      <Quotation
        appearanceId={id}
        articleOrVideoContent={quotingContent}
      />
    )
  }

  return null
}


_.propTypes = {
  appearance: PropTypes.shape({
    id: PropTypes.string,
    quotingContent: PropTypes.shape({
      medium: PropTypes.shape(),
      type: PropTypes.string
    })
  }).isRequired
}

export default _
