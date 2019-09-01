import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { showModal } from 'redux-react-modals'

import UsersExplorationContainer from './UsersExploration/UsersExplorationContainer'
import VerdictUserItemContainer from '../VerdictUserItem/VerdictUserItemContainer'

class ReviewersManager extends PureComponent {

  onAddClick = () => {
    const {
      dispatch,
    } = this.props

    dispatch(showModal("main", <UsersExplorationContainer isModal withAddButton />))
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
            <VerdictUserItemContainer
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

export default ReviewersManager
