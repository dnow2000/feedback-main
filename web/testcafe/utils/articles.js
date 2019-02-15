import { Selector } from 'testcafe'

import { createRole } from './signin'

export const createArticleButton = Selector('#create-article')
export const createCurrentUserReviewButton = Selector("a.create-current-user-review")
export const seeArticleButton = Selector("a.see-article")
export const seeArticleReviewsButton = Selector("a.see-article-reviews")
export const seeCurrentUserReviewedArticleButton = Selector("a.see-current-user-reviewed-article")
export const seeCurrentUserReviewButton = Selector("a.see-current-user-review")

export const signinAndCreateArticleAs = roleType => async t => {
  await t.useRole(createRole(roleType))
         .click(createArticleButton)
}

export const signinAndCreateCurrentUserReviewAs = roleType => async t => {
  await t.useRole(createRole(roleType))
         .click(createCurrentUserReviewButton)
}

export const signinAndSeeArticleAs = roleType => async t => {
  await t.useRole(createRole(roleType))
         .click(seeArticleButton)
}

export const signinAndSeeArticleReviewsAs = roleType => async t => {
  await t.useRole(createRole(roleType))
         .click(seeArticleReviewsButton)
}

export const signinAndSeeCurrentUserReviewAs = roleType => async t => {
  await t.useRole(createRole(roleType))
         .click(seeCurrentUserReviewButton)
}

export const signinAndSeeCurrentUserReviewedArticleAs = roleType => async t => {
  await t.useRole(createRole(roleType))
         .click(seeCurrentUserReviewedArticleButton)
}
