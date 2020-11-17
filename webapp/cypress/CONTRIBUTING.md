Package `cypress`

1. When selecting a dom element, use only class as much as possible:

Example, don't do:
```
it('should have one or more appearances', () => {
  cy.get('a.appearance-item').its('length').should('be.gte', 1)
})
```

But:
```
it('should have one or more appearances', () => {
  cy.get('.appearance-item').its('length').should('be.gte', 1)
})
```
