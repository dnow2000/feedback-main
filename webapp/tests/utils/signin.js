import { Role, Selector } from 'testcafe'

const { ROOT_PATH } = process.env

export const signinAs = user => async t => {
  const { email, password } = user
  const identifierInput = Selector('#identifier').find('.field-input')
  const passwordInput = Selector('#password').find('.field-input')
  const submitButton = Selector("button[type='submit']")
  return t
    .typeText(identifierInput, email)
    .wait(100)
    .typeText(passwordInput, password)
    .wait(100)
    .click(submitButton)
    .wait(1000)
}

export const createUserRole = roleType => Role(
  `${ROOT_PATH}/signin`,
  signinAs(roleType),
  { preserveUrl: true }
)

export const signinAndNavigateToAs = roleType => url => async t => {
  await t.useRole(createUserRole(roleType))
         .navigateTo(url)
}
