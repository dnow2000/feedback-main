import PropTypes from 'prop-types'
import React, { Component } from 'react'

import PublicationItem from './PublicationItem/PublicationItemContainer'

class PublicationsManager extends Component {

  componentDidMount () {
    const { requestGetPublications } = this.props
    requestGetPublications()
  }

  render () {
    const { publications } = this.props
    return (
      <div>
        {publications.map(({ publication }) => (
          <PublicationItem
            key={publication.id}
            publication={publication}
          />
        ))}
      </div>
    )
  }
}

PublicationsManager.propTypes = {
  publications: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  requestGetPublications: PropTypes.func.isRequired
}

export default PublicationsManager
