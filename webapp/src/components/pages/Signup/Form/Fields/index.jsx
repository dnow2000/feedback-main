import PropTypes from 'prop-types'
import React from 'react'
import { Route } from 'react-router-dom'

import ReviewerFields from './ReviewerFields'
import ScienceFields from './ScienceFields'
import TouFields from './TouFields'
import UserFields from './UserFields'


const _ = ({ onImageChange }) => (
  <div className="fields">
    <UserFields onImageChange={onImageChange} />
    <Route
      component={ScienceFields}
      exact
      path="/signup/apply/:roleType(editor|reviewer)"
    />
    <Route
      component={ReviewerFields}
      exact
      path="/signup/apply/reviewer"
    />
    <div className="pt20" />
    <TouFields />
  </div>
)

_.propTypes = {
  onImageChange: PropTypes.func.isRequired
}

export default _
