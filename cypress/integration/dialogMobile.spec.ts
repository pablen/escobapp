describe('Mobile dialogs', () => {
  it('keeps the configuration dialog within a short viewport and scrollable', () => {
    cy.viewport(390, 600)
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('showRules', 'false')
      },
    })

    cy.get('button[title="Configuración"]').click()
    cy.get('[role="dialog"]').should(($dialog) => {
      const element = $dialog[0]
      const viewport = element.ownerDocument.defaultView!
      const bounds = element.getBoundingClientRect()
      const styles = viewport.getComputedStyle(element)

      expect(bounds.width).to.be.at.least(viewport.innerWidth - 32)
      expect(bounds.height).to.be.at.most(viewport.innerHeight - 16)
      expect(styles.overflowY).to.match(/auto|scroll/)
      expect(element.scrollHeight).to.be.greaterThan(element.clientHeight)
    })
    cy.get('[role="dialog"]').scrollTo('bottom')
    cy.contains('Guardar').should('be.visible')
  })

  it('centers the configuration dialog on desktop', () => {
    cy.viewport(1280, 800)
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('showRules', 'false')
      },
    })

    cy.get('button[title="Configuración"]').click()
    cy.get('[role="dialog"] > form').should(($dialog) => {
      const element = $dialog[0]
      const viewport = element.ownerDocument.defaultView!
      const bounds = element.getBoundingClientRect()

      expect(bounds.left + bounds.width / 2).to.be.closeTo(
        viewport.innerWidth / 2,
        1,
      )
      expect(bounds.top + bounds.height / 2).to.be.closeTo(
        viewport.innerHeight / 2,
        1,
      )
    })
  })
})
