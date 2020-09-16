describe('appearances page', () => {
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
    cy.get('.tab-pane #links').contains(/.*\sLinks/)
  })

  it('should have one or more appearances', () => {
    cy.get('a.appearance-item').its('length').should('be.gte', 1)
  })
})

describe('each appearance', () => {
  beforeEach(() => {
    cy.visit('/landing')
    cy.get('.verdict-item').first().click({force: true})
  })

  it('should be a link', () => {
    cy.get('a.appearance-item')
      .first()
      .invoke('attr', 'href')
      .should('not.be.empty')
  })

  it('should have a thumb image', () => {
    cy.get('a.appearance-item').within(() => {
      cy.get('.appearance-item-img')
        .first()
        .should('have.attr', 'src')
    })
  })

  it('should have the appearance details', () => {
    cy.get('a.appearance-item').within(() => {
      cy.get('.appearance-title').first().should('exist')
      cy.get('.appearance-source').first().should('exist')
      cy.get('.appearance-url').first().should('exist')
    })
  })
})
