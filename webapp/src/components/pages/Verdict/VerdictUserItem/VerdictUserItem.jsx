import PropTypes from 'prop-types'
import { stringify } from 'query-string'
import React, { Component } from 'react'
import Dotdotdot from 'react-dotdotdot'
import { NavLink } from 'react-router-dom'
import { requestData } from 'redux-saga-data'

import AvatarContainer from '../../../layout/Avatar/AvatarContainer'

class VerdictUserItem extends Component {

  handleRemoveUser = () => {
    const { dispatch, match, user } = this.props
    const { params: { verdictId } } = match
    const { id: userId } = user
    dispatch(requestData({
      apiPath: '/verdictUsers',
      body: {
        userId,
        verdictId
      },
      method: 'DELETE'
    }))
  }

  render () {
    const {
      currentUser,
      evaluation,
      review,
      user,
      tags,
      verdict
    } = this.props
    const {
      publicName: currentPublicName
    } = (currentUser || {})
    const {
      email,
      publicName,
    } = (user || {})
    const {
      id: reviewId
    } = (review || {})
    const {
      articleId
    } = (verdict || {})
    const {
      value
    } = (evaluation || {})

    const reviewUrl = `${window.location.host}/reviews/new?articleId=${articleId}`
    const mailToSearch = stringify({
      body: `<div>Hello ${publicName},
        can you go %3ca href=${reviewUrl} target="_blank"> here </a>
      </div>`,
      subject: `Science Feedback: you were asked by ${currentPublicName} to review an article`
    })
    const mailTo = `mailto:${email}?${mailToSearch}`


    return (
      <article className="user-item box">
        <div className="content p24">
          <div className="flex-columns items-center">
            <div className="col-25 mr12">
              <AvatarContainer user={user} />
            </div>
            <div className="center">
              <div className="mb4 text-left">
                {publicName}
              </div>
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
            <div className="col-20" />
            <a className="button is-secondary mr8" href={mailTo}>
              Contact
            </a>
            <div>
              {
                reviewId
                  ? (
                    <NavLink
                      className='button is-primary see-verdict-review mr12'
                      to={`/reviews/${reviewId}`}
                    >
                      {value || 'See Review'}
                    </NavLink>
                  )
                : (
                  <div className='mr24'>
                    No review yet
                  </div>
                )
              }
            </div>
            <button
              className="button is-primary"
              onClick={this.handleRemoveUser}
              type="button"
            >
                Remove
            </button>
          </div>
        </div>
      </article>
    )
  }
}

VerdictUserItem.defaultProps = {
  currentUser: null,
  evaluation: null,
  review: null,
  tags: null,
  user: null,
  verdict: null
}

VerdictUserItem.propTypes = {
  currentUser: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  evaluation: PropTypes.object,
  match: PropTypes.object.isRequired,
  review: PropTypes.object,
  tags: PropTypes.array,
  user: PropTypes.object,
  verdict: PropTypes.object
}

export default VerdictUserItem
