import { connect } from 'react-redux'
import { compose } from 'redux'
import withQueryRouter from 'with-query-router'

import ReviewsExploration from './ReviewsExploration'
import mapStateToProps from './mapStateToProps'

export default compose(
  withQueryRouter(),
  connect(mapStateToProps)
)(ReviewsExploration)
