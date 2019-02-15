import { Role, Selector } from 'testcafe'

import { ROOT_PATH } from '../../src/utils/config'

const identifierInput = Selector('#identifier').find('.field-input')
const passwordInput = Selector('#password').find('.field-input')
const submitButton = Selector("button[type='submit']")

export const signinAs = roleType => async t => {
  const capitalizedRoleType = `${roleType[0].toUpperCase()}${roleType.slice(1)}`
  await t
    .typeText(identifierInput, `sftest.${roleType}.1@sciencefeedback.co`)
    .typeText(passwordInput, `sftest.${capitalizedRoleType}.1`)
    .click(submitButton)
}

export const createRole = roleType => Role(
  `${ROOT_PATH}signin`,
  signinAs(roleType),
  { preserveUrl: true }
)

export const signinAndNavigateToAs = roleType => url => async t => {
  await t.useRole(createRole(roleType))
         .navigateTo(url)
}
