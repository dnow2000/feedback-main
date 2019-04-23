import { fetchSandbox } from './helpers/sandboxes'
import { createUserRole } from './helpers/signin'


fixture("Signin | leads to the good redirect after signin")

test('User', async t => {
  const { user } = await fetchSandbox('get_existing_user_with_no_role')
  await t.useRole(createUserRole(user))
  const location = await t.eval(() => window.location)
  await t.expect(location.pathname).eql('/articles')
})

test('Admin', async t => {
  const { user } = await fetchSandbox('get_existing_admin_user')
  await t.useRole(createUserRole(user))
  const location = await t.eval(() => window.location)
  await t.expect(location.pathname).eql('/articles')
})

test('Editor', async t => {
    const { user } = await fetchSandbox('get_existing_editor_user')
    await t.useRole(createUserRole(user))
    const location = await t.eval(() => window.location)
    await t.expect(location.pathname).eql('/articles')
})

test('Reviewer', async t => {
    const { user } = await fetchSandbox('get_existing_reviewer_user')
    await t.useRole(createUserRole(user))
    const location = await t.eval(() => window.location)
    await t.expect(location.pathname).eql('/articles')
})
