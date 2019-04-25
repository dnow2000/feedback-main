import { connect } from 'react-redux'
import { compose } from 'redux'

import TrendingItem from './TrendingItem'
import mapStateToProps from './mapStateToProps'

export default compose(
  connect(mapStateToProps)
)(TrendingItem)
