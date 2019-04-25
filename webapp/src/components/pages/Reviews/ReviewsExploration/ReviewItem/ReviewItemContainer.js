import { connect } from 'react-redux'

import ReviewItem from './ReviewItem'
import mapStateToProps from './mapStateToProps'

export default connect(mapStateToProps)(ReviewItem)
