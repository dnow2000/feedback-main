import { ROOT_PATH } from '../utils/config'


describe('Signin', () => {
  it('can signin.', () => {
    cy.visit(`${ROOT_PATH}/signin`)
  })
})
