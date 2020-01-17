import PropTypes from 'prop-types'
import React, { useCallback, useMemo } from 'react'
import { showModal } from 'redux-react-modals'

import Feeds from 'components/layout/Feeds/Feeds'

import UserItemContainer from './UserItem/UserItemContainer'
import VerdictUserItemContainer from '../VerdictUserItem/VerdictUserItemContainer'

const ReviewersManager = ({
  dispatch,
  location: { search },
  verdictUsers
}) => {
  const hasNoReviewers = !verdictUsers || verdictUsers.length === 0


  const config = useMemo(() => ({
    apiPath: `/users${search}`
  }), [search])


  const onAddClick = useCallback(() => {
    const renderItem = item => <UserItemContainer user={item} />
    dispatch(showModal("main",
      <Feeds config={config} renderItem={renderItem} />))
  }, [config, dispatch])


  return (
    <div>
      <h2 className="subtitle flex-columns items-center">
        {"REVIEWERS"}
      </h2>
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
        onClick={onAddClick}
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

ReviewersManager.defaultProps = {
  verdictUsers: null
}

ReviewersManager.propTypes = {
  dispatch: PropTypes.func.isRequired,
  verdictUsers: PropTypes.array
}

export default ReviewersManager
