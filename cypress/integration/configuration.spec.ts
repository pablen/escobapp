describe('Game configuration', () => {
  beforeEach(() => {
    cy.visit('/?noShuffle=1&isPlayerTurn=1')
    cy.contains('¡EMPEZAR!').click()
    cy.get('button[title="Configuración"]').click()
  })

  it('loads a preset and restarts the game with its card design', () => {
    cy.get('[data-preset-id="del100"]').click()
    cy.contains('Guardar').click()

    cy.get('[data-testid="playerCards"] [data-testid^="card-"]').should(
      'have.length',
      3
    )
    cy.get('[data-testid="tableCards"] [data-testid^="card-"]').should(
      'have.length',
      4
    )
    cy.get('[data-cardtype="number"]').should('have.length.greaterThan', 0)
    cy.get('[data-cardtype="image"]').should('not.exist')
  })

  it('uses a manually configured deck and target value for a valid play', () => {
    cy.get('#targetValue').clear().type('5')
    cy.get('#playerCardsAmount').clear().type('1')
    cy.get('#tableCardsAmount').clear().type('1')
    cy.get('#availableCards').clear().type('2, 1, 3')
    cy.contains('Guardar').click()

    cy.get('[data-testid="playerCards"] [data-testid="card-0"]')
      .should('have.text', '2')
      .click()
    cy.get('[data-testid="tableCards"] [data-testid="card-2"]')
      .should('have.text', '3')
      .click()
    cy.contains('[data-testid="play-btn"]', 'Jugar').click()

    cy.contains('Esperando a que juegue la máquina...')
  })

  it('keeps the dialog open and explains invalid manual configuration', () => {
    cy.get('#playerCardsAmount').clear().type('1')
    cy.get('#tableCardsAmount').clear().type('1')
    cy.get('#targetValue').clear().type('5')
    cy.get('#availableCards').clear().type('5, 1, 2')
    cy.contains('Guardar').click()

    cy.contains(
      'El mazo no debe contener cartas de valor mayor o igual al de la Escoba'
    )
    cy.contains('Configuración')
  })
})
