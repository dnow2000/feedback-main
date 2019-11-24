const { ROOT_PATH } = process.env

fixture("00 Landing | Arriving to the Landing").page(`${ROOT_PATH}`)

test('Default | leads to the home page', async t => {
    await t
    const location = await t.eval(() => window.location)
    await t.expect(location.pathname).eql('/landing')
})
