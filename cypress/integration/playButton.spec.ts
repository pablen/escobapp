describe('Play button', () => {
  it('is not visible if IA turn', () => {
    cy.visit('/?noShuffle=1&isPlayerTurn=0')
    cy.contains('¡EMPEZAR!').click()
    cy.get('[data-testid="play-btn"]').should('not.exist')
  })

  it('is not visible if no cards are selected', () => {
    cy.visit('/?noShuffle=1&isPlayerTurn=1')
    cy.contains('¡EMPEZAR!').click()
    cy.get('[data-testid^="card-"] [aria-pressed="true"]').should(
      'have.length',
      0
    )
    cy.get('[data-testid="play-btn"]').should('not.exist')
  })

  it('discards the selected card if only a player card is selected', () => {
    cy.visit('/?noShuffle=1&isPlayerTurn=1')
    cy.contains('¡EMPEZAR!').click()
    cy.contains('Tu Turno')
    cy.get('[data-testid="playerCards"] [data-testid="card-0"]').should('exist')
    cy.get('[data-testid="card-0"]').click()
    cy.get('[data-testid="play-btn"]').contains('Descartar').click()
    cy.get('[data-testid="tableCards"] [data-testid="card-0"]').should('exist')
    cy.get('[data-testid="playerCards"] [data-testid="card-0"]').should(
      'not.exist'
    )
  })

  it('plays the selected cards if player and table cards are selected', () => {
    cy.visit('/?noShuffle=1&isPlayerTurn=1&availableCards=1,2,3,4,4,4,9,8,7,6')
    cy.contains('¡EMPEZAR!').click()
    cy.contains('Tu Turno')
    cy.get('[data-testid="playerCards"] [data-testid="card-0"]').should('exist')
    cy.get('[data-testid="tableCards"] [data-testid="card-6"]').should('exist')
    cy.get('[data-testid="card-0"]').click()
    cy.get('[data-testid="card-6"]').click()
    cy.get('[data-testid="play-btn"]').contains('Jugar').click()
    cy.get('[data-testid="tableCards"] [data-testid="card-6"]').should(
      'not.exist'
    )
    cy.get('[data-testid="playerCards"] [data-testid="card-0"]').should(
      'not.exist'
    )
  })

  it('displays a message if invalid play', () => {
    cy.visit('/?noShuffle=1&isPlayerTurn=1&availableCards=1,2,3,4,4,4,9,8,7,6')
    cy.contains('¡EMPEZAR!').click()
    cy.contains('Tu Turno')
    cy.get('[data-testid="playerCards"] [data-testid="card-0"]').should('exist')
    cy.get('[data-testid="tableCards"] [data-testid="card-7"]').should('exist')
    cy.get('[data-testid="card-0"]').click()
    cy.get('[data-testid="card-7"]').click()
    cy.get('[data-testid="play-btn"]').contains('Jugar').click()
    cy.get('[data-testid="tableCards"] [data-testid="card-7"]').should('exist')
    cy.get('[data-testid="playerCards"] [data-testid="card-0"]').should('exist')
    cy.contains('Las cartas elegidas no suman 10!')
  })

  it('plays equivalent fractions exactly', () => {
    cy.visit(
      '/?noShuffle=1&isPlayerTurn=1&playerCardsAmount=1&tableCardsAmount=2&targetValue=1&availableCards=2/4,1/2,1/3,1/6'
    )
    cy.contains('¡EMPEZAR!').click()
    cy.get('[data-testid="card-0"]').click()
    cy.get('[data-testid="card-2"]').click()
    cy.get('[data-testid="card-3"]').click()
    cy.get('[data-testid="play-btn"]').contains('Jugar').click()
    cy.get('[data-testid="playerCards"] [data-testid="card-0"]').should(
      'not.exist'
    )
    cy.get('[data-testid="tableCards"] [data-testid="card-2"]').should(
      'not.exist'
    )
  })
})
