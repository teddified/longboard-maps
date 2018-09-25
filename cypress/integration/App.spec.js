describe('App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/addRoute')
    cy.clearLocalStorage()
  })
  // it('starts with two marker', () => {
  //   cy.get('[title="Start"]').should('exist')
  //   cy.get('[title="Finish"]').should('exist')
  // })

  it('test', () => {
    cy.get('[data-test-id="addwaypoints"]').should('not.exist')
    cy.get('[data-test-id="savetrip"]').should('exist')
    cy.get('[data-test-id="distancelabel"]').should('exist')
    cy.get('[data-test-id="addwaypoints"]')
      .parent()
      .should('exist')
  })
})
