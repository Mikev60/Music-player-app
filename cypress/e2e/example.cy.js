// https://on.cypress.io/api

describe('My First Test', () => {
  it('Sanity test', () => {
    cy.visit('/')
    cy.contains('#header a:first-child', 'Music')
  })
})
