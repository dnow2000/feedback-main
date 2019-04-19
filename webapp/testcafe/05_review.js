import {
  commentReviewTextarea,
  editReviewButton,
  evaluationHighOption,
  evaluationNeutralOption,
  evaluationReviewSelect,
  submitReviewButton
} from './helpers/review'
import {
  signinAndCreateCurrentUserReviewAs,
  signinAndSeeCurrentUserReviewAs,
  signinAndSeeArticleReviewsAs
} from './helpers/articles'
import { signinAndNavigateToAs } from './helpers/signin'

fixture.skip("User Review")

test.before(signinAndSeeArticleReviewsAs('user'))('You cannot edit a review when you are a user', async t => {
  await t.expect(editReviewButton.exists)
         .notOk()
})

test.before(signinAndNavigateToAs('user')('/reviews/new'))
  ('You cannot create a review and you are redirected to the reviews when you are a simple user', async t => {
    const location = await t.eval(() => window.location)
    await t.expect(`${location.pathname}${location.search}`)
           .eql('/reviews/')
  })

test.before(signinAndNavigateToAs('user')('/reviews/AE?edit'))
  ('You cannot edit a review and you are redirected to the readonly page when you are a simple user', async t => {
    const location = await t.eval(() => window.location)
    await t.expect(`${location.pathname}${location.search}`)
           .eql('/reviews/AE')
  })




fixture.skip("Admin Review")

test.before(signinAndSeeArticleReviewsAs('admin'))('You cannot edit a review when you are an admin', async t => {
  await t.expect(editReviewButton.exists)
         .notOk()
})

test.before(signinAndNavigateToAs('admin')('/reviews/new'))
  ('You cannot create a review and you are redirected to the reviews when you are an admin', async t => {
    const location = await t.eval(() => window.location)
    await t.expect(`${location.pathname}${location.search}`)
           .eql('/reviews/')
  })

test.before(signinAndNavigateToAs('admin')('/reviews/AE?edit'))
  ('You cannot edit a review and you are redirected to the readonly page when you are an admin', async t => {
    const location = await t.eval(() => window.location)
    await t.expect(`${location.pathname}${location.search}`)
           .eql('/reviews/AE')
  })






fixture.skip("Editor Review")

test.before(signinAndSeeArticleReviewsAs('editor'))('You cannot edit a review when you are an editor', async t => {
  await t.expect(editReviewButton.exists)
         .notOk()
})

test.before(signinAndNavigateToAs('editor')('/reviews/new'))
  ('You cannot create a review and you are redirected to the reviews when you are an editor', async t => {
    const location = await t.eval(() => window.location)
    await t.expect(`${location.pathname}${location.search}`)
           .eql('/reviews/')
  })

test.before(signinAndNavigateToAs('editor')('/reviews/AE?edit'))
  ('You cannot edit a review and you are redirected to the readonly page when you are an editor', async t => {
    const location = await t.eval(() => window.location)
    await t.expect(`${location.pathname}${location.search}`)
           .eql('/reviews/AE')
  })






fixture.skip("Reviewer Review")

test.before(signinAndCreateCurrentUserReviewAs('reviewer'))(
  'Create a review when you are a reviewer', async t => {
    const location = await t.eval(() => window.location)
    await t.expect(`${location.pathname}${location.search}`)
           .match(/\/reviews\/new/)

    await t.typeText(commentReviewTextarea, "I would not say it like this.")
           .click(evaluationReviewSelect)
           .click(evaluationNeutralOption)

    await t.click(submitReviewButton)
    await t.expect(`${location.pathname}${location.search}`)
           .match(/\/reviews\/([A-Z0-9]*)/)
  })

test.before(signinAndSeeCurrentUserReviewAs('reviewer'))(
  'Edit a review when you are a reviewer', async t => {
    await t.click(editReviewButton)
    const location = await t.eval(() => window.location)
    await t.expect(`${location.pathname}${location.search}`)
           .match(/\/reviews\/([A-Z0-9]*)\?edit/)

    await t.typeText(commentReviewTextarea, "In fact, I would not say it like this.")
           .click(evaluationReviewSelect)
           .click(evaluationHighOption)

    await t.click(submitReviewButton)
    await t.expect(`${location.pathname}${location.search}`)
           .match(/\/reviews\/([A-Z0-9]*)/)
  })
