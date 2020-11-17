import {
  APP_NAME,
  COMMAND_NAME,
  DEFAULT_USER_PASSWORD,
  ROOT_PATH,
  TLD
} from '../utils/config'


describe('signin', () => {
  it(`can signin.`, () => {

    cy.visit(`${ROOT_PATH}/signin`)

    cy.get('input[name="identifier"]')
      .type(`${COMMAND_NAME}test.editor0@${APP_NAME}.${TLD}`)

    cy.get('input[name="password"]')
      .type(DEFAULT_USER_PASSWORD)

    cy.get('button[type="submit"]')
      .click()

    cy.url()
      .should('include', '/sources')
  })
})
