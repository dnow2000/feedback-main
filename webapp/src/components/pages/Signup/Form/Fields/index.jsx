import React from 'react'
import { Route } from 'react-router-dom'

import ReviewerFields from './ReviewerFields'
import ScienceFields from './ScienceFields'
import TouFields from './TouFields'
import UserFields from './UserFields'


export default () => (
  <div className="fields">
    <UserFields />
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
