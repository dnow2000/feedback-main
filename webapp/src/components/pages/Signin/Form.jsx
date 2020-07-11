import classnames from 'classnames'
import React from 'react'
import { useSelector } from 'react-redux'

import TextField from 'components/layout/form/fields/TextField'
import PasswordField from 'components/layout/form/fields/PasswordField'


export default ({ handleSubmit }) => {
  const { isPending } = useSelector(
    state => state.requests['/users/signin']
  ) || {}

  return (
    <form
      autoComplete="off"
      disabled={isPending}
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        name="name"
        type="hidden"
        value="user"
      />
      <TextField
        id="identifier"
        label="login"
        name="identifier"
        placeholder="Your login email"
        required
        type="email"
      />
      <PasswordField
        id="password"
        label="password"
        name="password"
        placeholder="Your login password"
        required
      />
      <button
        className={classnames('submit', {
          'is-loading': isPending,
        })}
        disabled={isPending}
        type="submit"
      >
          Sign in
      </button>
    </form>
  )
}
