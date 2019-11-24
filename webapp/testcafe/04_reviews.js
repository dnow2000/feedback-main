import {
  createCurrentUserReviewButton,
  signinAndSeeReviewsAs
} from './utils/reviews'

fixture.skip("User Reviews")
  .beforeEach(signinAndSeeReviewsAs('user'))

test('You cannot create your own review when you are a user', async t => {
  await t.expect(createCurrentUserReviewButton.exists)
          .notOk()
})
