import PropTypes from 'prop-types'
import React from 'react'
import { Modal } from 'redux-react-modals'

const Main = ({ children, name, Tag }) => (
  <Tag className={`main ${name}-main`}>
    <Modal name="main" />
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

export default Main
