describe('MapScreen', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/addRoute')
    cy.clearLocalStorage()
  })
  // it('starts with two marker', () => {
  //   cy.get('[title="Start"]').should('exist')
  //   cy.get('[title="Finish"]').should('exist')
  // })

  it('check all elements on Map', () => {
    cy.get('[data-test-id="addwaypoints"]').should('not.exist')
    cy.get('[data-test-id="savetrip"]').should('exist')
    cy.get('[data-test-id="distancelabel"]').should('exist')
    cy.get('[data-test-id="addwaypoints"]')
      .parent()
      .should('exist')
  })
})
describe('OverviewScreen', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.clearLocalStorage()
  })

  it('check all elements on Overview', () => {
    cy.get('[data-test-id="TripHeader"]').should('exist')
    cy.get('[data-test-id="TripCardSection"]').should('exist')
    cy.get('[data-test-id="AddButton"]').should('exist')
    cy.get('[data-test-id="TripCard"]').should('exist')
  })

  it('navigation', () => {
    cy.get('[data-test-id="AddButton"]').click()
    cy.go('forward')
    cy.location('pathname').should('include', 'addRoute')
  })
})
describe('SaveScreen', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/saveTrip')
    cy.clearLocalStorage()
  })

  it('check all elements on Save', () => {
    cy.get('[data-test-id="SaveHeader"]').should('exist')
    cy.get('[data-test-id="TripInput"]').should('exist')
    cy.get('[data-test-id="SaveButton"]').should('exist')
  })

  it('navigation', () => {
    cy.get('[data-test-id="SaveButton"]').click()
    cy.go('forward')
    cy.location('pathname').should('include', '')
  })
})
