import { Selector } from 'testcafe'

export const editArticleButton = Selector('#edit')
export const submitArticleButton = Selector('#submit')
export const summaryArticleTextarea = Selector('textarea[name="summary"]')
export const titleArticleInput = Selector('input[name="title"]')
export const urlArticleInput = Selector('input[name="url"]')

export const createCurrentUserReviewButton = Selector('#create-own-review')
export const seeCurrentUserReviewButton = Selector('#see-own-review')
