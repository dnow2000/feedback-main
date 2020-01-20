import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import Dotdotdot from 'react-dotdotdot'
import { requestData } from 'redux-thunk-data'

import Avatar from 'components/layout/Avatar'

class UserItem extends PureComponent {

  render () {
    const {
      user,
      tags,
      onClick
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
            <div>
              <button
                className="button is-primary"
                onClick={() => onClick(user.id)}
                type="button"
              >
                  +
              </button>
            </div>
          </div>
        </div>
      </article>
    )
  }
}

UserItem.defaultProps = {
  tags: null,
  user: null
}

UserItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.shape().isRequired,
  tags: PropTypes.array,
  user: PropTypes.shape()
}

export default UserItem
