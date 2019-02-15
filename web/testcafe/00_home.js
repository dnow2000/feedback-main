import { ROOT_PATH } from '../src/utils/config'

fixture("00 Home | Arriving to the Home").page(`${ROOT_PATH}`)

test('Default | leads to the home page', async t => {
    await t
    const location = await t.eval(() => window.location)
    await t.expect(location.pathname).eql('/home')
})
