import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Dotdotdot from 'react-dotdotdot'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { requestData } from 'redux-saga-data'

import Avatar from '../../layout/Avatar'
import { selectTagsByUserId } from '../../../selectors'

class UserItem extends Component {

  handleAddReviewer = () => {
    const { dispatch, match, user } = this.props
    const { params: { verdictId } } = match
    const { id: userId } = user
    dispatch(requestData({
      apiPath: '/verdictUsers',
      body: {
        userId,
        verdictId
      },
      method: 'POST'
    }))
  }

  render () {
    const {
      user,
      tags,
      withAddButton
    } = this.props
    const {
      id,
      publicName,
    } = (user || {})
    return (
      <article className="user-item box">
        <div className="content p24">
          <div className="flex-columns items-center">
            <a
              className="anchor flex-columns items-center mr12"
              href={`/users/${id}`}
            >
              <Avatar user={user} />
              <div className="mb4 text-left">
                {publicName}
              </div>
            </a>
            <div className="flex-auto center">
              <div className="flex-start items-center">
                {
                  tags.map(({ text }) => (
                    <Dotdotdot className="tag fs12" clamp={60} key={text}>
                      #{text}
                    </Dotdotdot>
                  ))
                }
              </div>
            </div>
            {withAddButton && (
              <div>
                <button
                  className="button is-primary"
                  onClick={this.handleAddReviewer}
                  type="button"
                >
                    +
                </button>
              </div>
            )}
          </div>
        </div>
      </article>
    )
  }
}

UserItem.defaultProps = {
  tags: null,
  user: null,
  withAddButton: false
}

UserItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  tags: PropTypes.array,
  user: PropTypes.object,
  withAddButton: PropTypes.bool,
}

function mapStateToProps (state, ownProps) {
  const { user } = ownProps
  const { id: userId } = (user || {})
  return {
    tags: selectTagsByUserId(state, userId)
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(UserItem)
