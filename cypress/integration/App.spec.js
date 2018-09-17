describe('App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.clearLocalStorage()
  })

  it('starts without player', () => {
    cy.get('[data-test-id="SetupScreen-player"]').should('not.exist')
    cy.get('input').should('have.attr', 'placeholder', 'Player name')
  })

  it('starts without play button, but with hint text', () => {
    cy.get('[data-test-id="SetupScreen-playButton"]').should('not.exist')
    cy.get('[data-test-id="SetupScreen-hintText"]').should('exist')
  })

  it('push button', () => {
    cy.get('input')
      .should('have.attr', 'placeholder', 'Player name')
      .type('John{Enter}')
    cy.get('[data-test-id="SetupScreen-playButton"]').click()
    cy.go('forward')
    cy.location('pathname').should('include', 'summary')
  })

  describe('Delete a player on SetupScreen', () => {
    beforeEach(() => {
      cy.get('input')
        .should('have.attr', 'placeholder', 'Player name')
        .type('John{Enter}')
      cy.get('input')
        .should('have.attr', 'placeholder', 'Player name')
        .type('Jerry{Enter}')
    })
    it('delete a player', () => {
      cy.get('[data-test-id="SetupScreen-player"]')
        .contains('Jerry')
        .click()
        .should('not.exist')
    })
  })

  describe('Go to ScoreUpdater', () => {
    beforeEach(() => {
      cy.get('input').type('John{Enter}')
      cy.get('button')
        .contains('Play!')
        .click()
      cy.go('forward')
      cy.get('button')
        .contains('Add Round')
        .click()
    })

    it('has button back', () => {
      cy.get('button')
        .contains('Back')
        .should('exist')
        .click()
      cy.get('button')
        .contains('New Game')
        .click()
      cy.get('[data-test-id="SetupScreen-player').should('not.exist')
    })
  })
})
