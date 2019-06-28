import { connect } from 'react-redux'
import { compose } from 'redux'

import Verdicts from './Verdicts'
import mapStateToProps from './mapStateToProps'
import { withRequiredLogin} from '../../hocs'

export default compose(
  withRequiredLogin,
  connect(mapStateToProps)
)(Verdicts)
