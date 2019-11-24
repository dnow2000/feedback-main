import {
  createCurrentUserReviewButton,
  editArticleButton,
  seeCurrentUserReviewButton,
  submitArticleButton,
  summaryArticleTextarea,
  titleArticleInput,
  urlArticleInput
} from './utils/article'
import {
  signinAndCreateArticleAs,
  signinAndSeeArticleAs,
  signinAndSeeCurrentUserReviewedArticleAs,
} from './utils/articles'
import { signinAndNavigateToAs } from './utils/signin'

fixture.skip("User Article").beforeEach(signinAndSeeArticleAs('user'))

test('You cannot edit an article when you are a simple user', async t => {
    await t.expect(editArticleButton.exists)
           .notOk()
})

test('You cannot create/see a review when you are a simple user', async t => {
  await t.expect(createCurrentUserReviewButton.exists)
           .notOk()
  await t.expect(seeCurrentUserReviewButton.exists)
         .notOk()
})

test.before(signinAndNavigateToAs('user')('/articles/new'))
  ('You cannot create an article and you are redirected to the articles when you are a simple user', async t => {
    const location = await t.eval(() => window.location)
    await t.expect(`${location.pathname}${location.search}`)
           .eql('/articles/?orderBy=articles.id+desc')
  })

test.before(signinAndNavigateToAs('user')('/articles/AE?edit'))
  ('You cannot edit an article and you are redirected to the readonly page when you are a simple user', async t => {
    const location = await t.eval(() => window.location)
    await t.expect(`${location.pathname}${location.search}`)
           .eql('/articles/AE')
  })



fixture.skip("Admin Article").beforeEach(signinAndSeeArticleAs('admin'))

test('You cannot edit an article when you are an admin', async t => {
  await t.expect(editArticleButton.exists)
         .notOk()
})

test('You cannot create/see a review when you are an admin', async t => {
    await t.expect(createCurrentUserReviewButton.exists)
           .notOk()
    await t.expect(seeCurrentUserReviewButton.exists)
           .notOk()
})

test.before(signinAndNavigateToAs('admin')('/articles/new'))
  ('You cannot create an article and you are redirected to the articles when you are an admin', async t => {
    const location = await t.eval(() => window.location)
    await t.expect(`${location.pathname}${location.search}`)
           .eql('/articles/?orderBy=articles.id+desc')
  })

test.before(signinAndNavigateToAs('admin')('/articles/AE?edit'))
  ('You cannot edit an article and you are redirected to the readonly page when you are an admin', async t => {
    const location = await t.eval(() => window.location)
    await t.expect(`${location.pathname}${location.search}`)
           .eql('/articles/AE')
  })


fixture.skip("Editor Article")

test.before(signinAndCreateArticleAs('editor'))(
  'Create an article when you are an editor', async t => {
    await t.typeText(urlArticleInput, 'https://blog.mondediplo.net/appels-sans-suite-1')
           .typeText(titleArticleInput, 'La pompe à phynance')
           .typeText(summaryArticleTextarea, ' Et le jean-michelisme.')

    await t.click(submitArticleButton)

    const location = await t.eval(() => window.location)
    await t.expect(`${location.pathname}${location.search}`)
           .match(/\/articles\/([A-Z0-9]*)/)
})

test.before(signinAndSeeArticleAs('editor'))(
  'Edit an article when you are an editor', async t => {
    await t.click(editArticleButton)
    const location = await t.eval(() => window.location)
    await t.expect(`${location.pathname}${location.search}`)
           .match(/\/articles\/([A-Z0-9]*)\?edit/)

    await t.typeText(titleArticleInput, ' test')
    await t.typeText(summaryArticleTextarea, 'test')

    await t.click(submitArticleButton)
    await t.expect(`${location.pathname}${location.search}`)
           .match(/\/articles\/([A-Z0-9]*)/)
  })

test.before(signinAndSeeArticleAs('editor'))(
  'You cannot create/see a review when you are an editor', async t => {
    await t.expect(createCurrentUserReviewButton.exists)
           .notOk()
    await t.expect(seeCurrentUserReviewButton.exists)
           .notOk()
  })


fixture.skip("Reviewer Article")

test.before(signinAndSeeArticleAs('reviewer'))(
  'You cannot edit an article when you are a reviewer', async t => {
    await t.expect(editArticleButton.exists)
           .notOk()
  })

test.before(signinAndSeeArticleAs('reviewer'))(
  'You can create a review when you are a reviewer', async t => {
    await t.click(createCurrentUserReviewButton)
    const location = await t.eval(() => window.location)
    await t.expect(`${location.pathname}${location.search}`)
           .match(/\/reviews\/new\?articleId=([A-Z0-9]*)/)
  })

test.before(signinAndSeeCurrentUserReviewedArticleAs('reviewer'))(
  'You can see a review when you are a reviewer', async t => {
    await t.click(seeCurrentUserReviewButton)
    const location = await t.eval(() => window.location)
    await t.expect(`${location.pathname}${location.search}`)
          .match(/\/reviews\/([A-Z0-9]*)/)
  })

test.before(signinAndNavigateToAs('reviewer')('/articles/new'))
  ('You cannot create an article and you are redirected to the articles when you are a reviewer', async t => {
    const location = await t.eval(() => window.location)
    await t.expect(`${location.pathname}${location.search}`)
           .eql('/articles/?orderBy=articles.id+desc')
  })

test.before(signinAndNavigateToAs('reviewer')('/articles/AE?edit'))
  ('You cannot edit an article and you are redirected to the readonly page when you are a reviewer', async t => {
    const location = await t.eval(() => window.location)
    await t.expect(`${location.pathname}${location.search}`)
           .eql('/articles/AE')
  })
