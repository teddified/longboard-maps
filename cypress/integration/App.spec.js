describe('App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/addRoute')
    cy.clearLocalStorage()
  })

  it('starts with two marker', () => {
    cy.get('[title="Start"]').should('exist')
    cy.get('[title="Finish"]').should('exist')
  })

  // it('starts without play button, but with hint text', () => {
  //   cy.get('[data-test-id="SetupScreen-playButton"]').should('not.exist')
  //   cy.get('[data-test-id="SetupScreen-hintText"]').should('exist')
  // })

  // it('push button', () => {
  //   cy.get('input')
  //     .should('have.attr', 'placeholder', 'Player name')
  //     .type('John{Enter}')
  //   cy.get('[data-test-id="SetupScreen-playButton"]').click()
  //   cy.go('forward')
  //   cy.location('pathname').should('include', 'summary')
  // })
})
