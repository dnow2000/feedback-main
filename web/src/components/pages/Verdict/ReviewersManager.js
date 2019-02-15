import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { showModal } from 'redux-react-modals'

import VerdictUserItem from './VerdictUserItem'
import UsersExploration from '../Users/UsersExploration'
import { selectUsersByVerdictId } from '../../../selectors'

class ReviewersManager extends Component {

  onAddClick = () => {
    const {
      dispatch,
    } = this.props

    dispatch(showModal("main", <UsersExploration isModal withAddButton />))
  }

  render () {
    const {
      verdictUsers
    } = this.props

    const hasNoReviewers = !verdictUsers || verdictUsers.length === 0

    return (
      <div>
        {
          verdictUsers && verdictUsers.map(verdictUser => (
            <VerdictUserItem
              key={verdictUser.id}
              user={verdictUser}
            />
          ))
        }
        <button
          className="button is-secondary"
          type="button"
          onClick={this.onAddClick}
        >
          {
            hasNoReviewers
            ? 'Add first reviewers'
            : 'Add other reviewers'
          }
        </button>
      </div>
    )
  }
}

ReviewersManager.defaultProps = {
  verdictUsers: null
}

ReviewersManager.propTypes = {
  dispatch: PropTypes.func.isRequired,
  verdictUsers: PropTypes.array
}

function mapStateToProps (state, ownProps) {
  const { match: { params: { verdictId } } } = ownProps
  return {
    verdictUsers: selectUsersByVerdictId(state, verdictId)
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(ReviewersManager)
