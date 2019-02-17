import { fetchSandbox } from './helpers/sandboxes'
import { createUserRole } from './helpers/signin'

fixture("Signin | leads to the good redirect after signin")

test('User', async t => {
  const { user } = await fetchSandbox('get_existing_admin_user')
  await t.useRole(createUserRole(user))
  const location = await t.eval(() => window.location)
  await t.expect(location.pathname).eql('/articles')
})

test('Admin', async t => {
    await t.useRole(createUserRole('admin'))
    const location = await t.eval(() => window.location)
    await t.expect(location.pathname).eql('/articles')
})

test('Editor', async t => {
    await t.useRole(createUserRole('editor'))
    const location = await t.eval(() => window.location)
    await t.expect(location.pathname).eql('/articles')
})

test('Reviewer', async t => {
    await t.useRole(createUserRole('reviewer'))
    const location = await t.eval(() => window.location)
    await t.expect(location.pathname).eql('/articles')
})
