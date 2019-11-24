import { Selector } from 'testcafe'

import { createUserRole } from './signin'

export const createArticleButton = Selector('#create-article')
export const createCurrentUserReviewButton = Selector("a.create-current-user-review")
export const seeArticleButton = Selector("a.see-article")
export const seeArticleReviewsButton = Selector("a.see-article-reviews")
export const seeCurrentUserReviewedArticleButton = Selector("a.see-current-user-reviewed-article")
export const seeCurrentUserReviewButton = Selector("a.see-current-user-review")

export const signinAndCreateArticleAs = roleType => async t => {
  await t.useRole(createUserRole(roleType))
         .click(createArticleButton)
}

export const signinAndCreateCurrentUserReviewAs = roleType => async t => {
  await t.useRole(createUserRole(roleType))
         .click(createCurrentUserReviewButton)
}

export const signinAndSeeArticleAs = roleType => async t => {
  await t.useRole(createUserRole(roleType))
         .click(seeArticleButton)
}

export const signinAndSeeArticleReviewsAs = roleType => async t => {
  await t.useRole(createUserRole(roleType))
         .click(seeArticleReviewsButton)
}

export const signinAndSeeCurrentUserReviewAs = roleType => async t => {
  await t.useRole(createUserRole(roleType))
         .click(seeCurrentUserReviewButton)
}

export const signinAndSeeCurrentUserReviewedArticleAs = roleType => async t => {
  await t.useRole(createUserRole(roleType))
         .click(seeCurrentUserReviewedArticleButton)
}
