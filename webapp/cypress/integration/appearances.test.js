describe('when arriving on the verdict links page', () => {
  beforeEach(() => {
    cy.visit('/landing')
    cy.get('.verdict-item').first().click({force: true})
  })

  it('should be able navigate to verdict-item/links page', () => {
    cy.url().should('include', '/links')
  })

  it('should have a verdict-item with details', () => {
    cy.get('.verdict-item').find('h3')
    cy.get('.tags a').contains('Read full review')
  })

  it('should have a links tab', () => {
    cy.get('.tab.tab-links').contains(/.*\sLinks/)
  })

  it('should have one or more links', () => {
    cy.get('.link-item').its('length').should('be.gte', 1)
  })
})

describe('when click on one link item', () => {
  beforeEach(() => {
    cy.visit('/landing')
    cy.get('.verdict-item').first().click({force: true})
  })

  /* TODO manage that with the sf sandbox
  it('should have an archive link', () => {
    cy.get('.link-item')
      .first()
      .invoke('attr', 'href')
      .should('not.be.empty')
  })
  */

  it('should have a thumb image', () => {
    cy.get('.link-item').within(() => {
      cy.get('.link-item-img')
        .first()
        .should('have.attr', 'src')
    })
  })

  it('should have the link details', () => {
    cy.get('.link-item').within(() => {
      cy.get('.link-title').first().should('exist')
      cy.get('.link-source').first().should('exist')
      cy.get('.link-url').first().should('exist')
    })
  })
})
