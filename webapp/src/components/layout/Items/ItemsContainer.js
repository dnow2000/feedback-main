import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import withQuery from 'with-react-query'

import Items from './Items'
import { selectItems, selectRequest } from './utils'


const mapStateToProps = (state, ownProps) => {
  const { config } = ownProps
  return {
    isPending: (selectRequest(state, config) || {}).isPending,
    items: selectItems(state, config)
  }
}

export default compose(
  connect(mapStateToProps),
)(Items)
