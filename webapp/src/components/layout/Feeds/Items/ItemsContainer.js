import { connect } from 'react-redux'

import Items from './Items'
import { selectItems, selectRequest } from '../utils'


const mapStateToProps = (state, ownProps) => {
  const { config } = ownProps
  return {
    isPending: (selectRequest(state, config) || {}).isPending,
    items: selectItems(state, config)
  }
}

export default connect(mapStateToProps)(Items)
