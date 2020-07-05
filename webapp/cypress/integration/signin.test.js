import {
  APP_NAME,
  COMMAND_NAME,
  ROOT_PATH,
  TLD
} from '../utils/config'


describe('Signin', () => {
  it('can signin.', () => {
    cy.visit(`${ROOT_PATH}/signin`)

    cy.get('input[name="identifier"]')
      .type(`${COMMAND_NAME}test.editor0@${APP_NAME}.${TLD}`)

      cy.get('input[name="password"]')
        .type('user@AZERTY123')

    cy.get('button[type="submit"]')
      .click()
  })
})
