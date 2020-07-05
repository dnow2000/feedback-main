import { ROOT_PATH } from '../utils/config'


describe('Signin', () => {
  it('can signin.', () => {
    cy.visit(`${ROOT_PATH}/signin`)

    cy.get('input[name="identifier"]')
      .type('fbtest.editor0@feedback.news')

      cy.get('input[name="password"]')
        .type('user@AZERTY123')

    cy.get('button[type="submit"]')
      .click()
  })
})
