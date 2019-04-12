import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { requestData } from 'redux-saga-data'

import RolesManager from './RolesManager'
import { withRedirectToSigninWhenNotAuthenticated, withRoles } from '../../hocs'
import Header from '../../layout/Header'
import Main from '../../layout/Main'
import UserItem from '../Users/UserItem'
import { selectUserById } from '../../../selectors'
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
        <Header />
        <Main name="review">
          <section className="section hero">
            <h1 className="title">
              Profile
            </h1>
          </section>
          <section>
            <UserItem user={user} />
          </section>
          <section>
            <RolesManager />
          </section>
        </Main>
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

function mapStateToProps(state, ownProps) {
  const { match: { params: { userId } } } = ownProps
  return {
    user: selectUserById(state, userId)
  }
}

export default compose(
  withRedirectToSigninWhenNotAuthenticated,
  withRoles({ creationRoleTypes: ['master'], modificationRoleTypes: ['master'] }),
  withRouter,
  connect(mapStateToProps)
)(User)
