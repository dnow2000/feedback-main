import { Selector } from 'testcafe'

export const editReviewButton = Selector('#edit-review')
export const evaluationHighOption = Selector('option').withText('+1 High')
export const evaluationNeutralOption = Selector('option').withText('0 Neutral')
export const evaluationReviewSelect = Selector('select[name="evaluationId"]')
export const submitReviewButton = Selector('#submit-review')
export const commentReviewTextarea = Selector('textarea[name="comment"]')
