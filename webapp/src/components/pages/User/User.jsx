import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { requestData } from 'redux-saga-data'

import PublicationsManagerContainer from './PublicationsManager/PublicationsManagerContainer'
import HeaderContainer from '../../layout/Header/HeaderContainer'
import MainContainer from '../../layout/Main/MainContainer'
import UserItemContainer from '../Users/UsersExploration/UserItem/UserItemContainer'
import { userNormalizer } from '../../../utils/normalizers'

class User extends Component {
  componentDidMount() {
    this.handleRequestData()
  }

  handleRequestData = () => {
    const { dispatch, match: { params: { userId } } } = this.props
    dispatch(
      requestData({
        apiPath: `/users/${userId}`,
        normalizer: userNormalizer
      })
    )
  }

  render () {
    const { user } = this.props
    return (
      <Fragment>
        <HeaderContainer />
        <MainContainer name="review">
          <section className="section hero">
            <h1 className="title">
              Profile
            </h1>
          </section>
          <section>
            <UserItemContainer user={user} />
          </section>
          <section>
            <h3 className="subtitle">
              REVIEWER
            </h3>
            <PublicationsManagerContainer user={user} />
          </section>
        </MainContainer>
      </Fragment>
    )
  }
}

User.defaultProps = {
  user: null
}

User.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  user: PropTypes.object
}

export default User
