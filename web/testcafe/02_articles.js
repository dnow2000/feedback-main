import {
  createArticleButton,
  createCurrentUserReviewButton,
  seeArticleButton,
  seeCurrentUserReviewButton
} from './utils/articles'
import { createRole } from './utils/signin'

fixture.skip("User Articles")
  .beforeEach(t => t.useRole(createRole('user')))

test('You cannot create an article when you are a simple user', async t => {
  await t.expect(createArticleButton.exists)
          .notOk()
})

test(
  'You cannot create/see a review (made by you) when you are a simple user',
  async t => {
    await t.expect(createCurrentUserReviewButton.exists)
           .notOk()
    await t.expect(seeCurrentUserReviewButton.exists)
          .notOk()
  })



fixture.skip("Admin Articles")
  .beforeEach(t => t.useRole(createRole('admin')))

test('You cannot create an article when you are an admin', async t => {
  await t.expect(createArticleButton.exists)
         .notOk()
})

test('You cannot create/see a review (made by you) when you are an admin', async t => {
  await t.expect(createCurrentUserReviewButton.exists)
         .notOk()
  await t.expect(seeCurrentUserReviewButton.exists)
         .notOk()
})





fixture.skip("Editor Articles")
  .beforeEach(t => t.useRole(createRole('editor')))

test('Go to create an article when you are an editor', async t => {
  await t.click(createArticleButton)
  const location = await t.eval(() => window.location)
  await t.expect(location.pathname).eql('/articles/new')
})

test('Go to edit an article when you are an editor', async t => {
  await t.click(seeArticleButton)
  const location = await t.eval(() => window.location)
  await t.expect(location.pathname).match(/\/articles\/([A-Z0-9]*)/)
})

test('You cannot create/see a review (made by you) when you are an editor', async t => {
  await t.expect(createCurrentUserReviewButton.exists)
       .notOk()
  await t.expect(seeCurrentUserReviewButton.exists)
         .notOk()
})





fixture("Reviewer Articles")
  .beforeEach(t => t.useRole(createRole('review')))

test('You cannot create an article when you are a reviewer', async t => {
  await t.expect(createArticleButton.exists)
          .notOk()
})

test('You can create a review when you are a reviewer', async t => {
    await t.click(createCurrentUserReviewButton)
    const location = await t.eval(() => window.location)
    await t.expect(`${location.pathname}${location.search}`)
           .match(/\/reviews\/new\?articleId=([A-Z0-9]*)/)
})

test('You can see a review (made by you) when you are a reviewer', async t => {
    await t.click(seeCurrentUserReviewButton)
    const location = await t.eval(() => window.location)
    await t.expect(`${location.pathname}${location.search}`)
          .match(/\/reviews\/([A-Z0-9]*)/)
})
