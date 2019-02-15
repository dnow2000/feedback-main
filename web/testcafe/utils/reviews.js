import { Selector } from 'testcafe'

import { createRole } from './signin'

export const createCurrentUserReviewButton = Selector('#create-current-user-review')
export const seeArticleButton = Selector("a.see-article")
export const seeCurrentUserReviewButton = Selector("a.see-current-user-review")
export const seeAllReviewsButton = Selector("a.see-/reviews")

export const signinAndSeeReviewsAs = roleType => async t => {
  await t.useRole(createRole(roleType))
         .click(seeAllReviewsButton)
}
