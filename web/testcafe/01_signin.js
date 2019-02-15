import { createRole } from './utils/signin'

fixture("Signin | leads to the good redirect after signin")

test('User', async t => {
    await t.useRole(createRole('user'))
    const location = await t.eval(() => window.location)
    await t.expect(location.pathname).eql('/articles')
})

test('Admin', async t => {
    await t.useRole(createRole('admin'))
    const location = await t.eval(() => window.location)
    await t.expect(location.pathname).eql('/articles')
})

test('Editor', async t => {
    await t.useRole(createRole('editor'))
    const location = await t.eval(() => window.location)
    await t.expect(location.pathname).eql('/articles')
})

test('Reviewer', async t => {
    await t.useRole(createRole('reviewer'))
    const location = await t.eval(() => window.location)
    await t.expect(location.pathname).eql('/articles')
})
