import PropTypes from 'prop-types'
import React from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

import Modal from './Modal'

const Main = ({ children, name, Tag }) => (
  <Tag className={`main ${name}-main`}>
    <Modal />
    {children}
  </Tag>
)

Main.defaultProps = {
  Tag: 'main',
}

Main.propTypes = {
  Tag: PropTypes.string,
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
}

export default compose(withRouter)(Main)
