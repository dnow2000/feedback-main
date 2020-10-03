describe('When arriving on the verdict appearances page', () => {
  beforeEach(() => {
    cy.visit('/landing')
    cy.get('.verdict-item').first().click({force: true})
  })

  it('should be able navigate to verdict-item/appearances page', () => {
    cy.url().should('include', '/appearances')
  })

  it('should have a verdict-item with details', () => {
    cy.get('.verdict-item').find('h3')
    cy.get('.tags a').contains('Read full review')
  })

  it('should have a links tab', () => {
    cy.get('.tab.appearances').contains(/.*\sLinks/)
  })

  it('should have one or more appearances', () => {
    cy.get('.appearance-item').its('length').should('be.gte', 1)
  })
})

describe('When click on one appearance item', () => {
  beforeEach(() => {
    cy.visit('/landing')
    cy.get('.verdict-item').first().click({force: true})
  })

  /* TODO manage that with the sf sandbox
  it('should have an archive link', () => {
    cy.get('.appearance-item')
      .first()
      .invoke('attr', 'href')
      .should('not.be.empty')
  })
  */

  it('should have a thumb image', () => {
    cy.get('.appearance-item').within(() => {
      cy.get('.appearance-item-img')
        .first()
        .should('have.attr', 'src')
    })
  })

  it('should have the appearance details', () => {
    cy.get('.appearance-item').within(() => {
      cy.get('.appearance-title').first().should('exist')
      cy.get('.appearance-source').first().should('exist')
      cy.get('.appearance-url').first().should('exist')
    })
  })
})
