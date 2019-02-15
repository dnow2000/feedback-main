import {
  Field,
  Form,
  SubmitButton
} from 'pass-culture-shared'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

import Header from '../layout/Header'
import Main from '../layout/Main'

const Signup = ({ errors }) => (
  <Fragment>
    <Header />
    <Main name="sign-up" fullscreen>
      <section className='section fullheight flex-center items-center'>
        <Form
          action='/users'
          className="col-1of1"
          handleSuccessRedirect={() => '/articles'}
          name='user'
          layout='vertical'
          resolve={userFromRequest => Object.assign({ isCurrent: true }, userFromRequest)}
        >
          <Field
            name='email'
            label='email'
            placeholder="nom@example.fr"
            required
          />
          <Field
            autoComplete='name'
            name='publicName'
            label='login'
            placeholder='login'
            required
          />
          <Field
            autoComplete="new-password"
            name='password'
            label='password'
            placeholder="password"
            required
            type="password"
          />
          <div className="errors">
            {errors}
          </div>
          <div className='field buttons-field'>
            <NavLink to="/signin" className="button is-secondary">
              Already have an account
            </NavLink>
            <SubmitButton className="button is-primary is-outlined">
              Sign up
            </SubmitButton>
          </div>
        </Form>
      </section>
    </Main>
  </Fragment>
)

Signup.defaultProps = {
  errors: null
}

Signup.propTypes = {
  errors: PropTypes.array
}

export default Signup
