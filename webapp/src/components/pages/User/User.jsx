import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { requestData } from 'redux-thunk-data'

import PublicationsManagerContainer from './PublicationsManager/PublicationsManagerContainer'
import Header from 'components/layout/Header'
import Main from 'components/layout/Main'
import UserItemContainer from 'components/layout/UserItem/UserItemContainer'
import { userNormalizer } from 'utils/normalizers'

class User extends PureComponent {
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
      <>
        <Header />
        <Main name="review">
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
        </Main>
      </>
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
