describe('Login', () => {
  it('Login', () => {
    cy.visit('http://localhost:4200/')

    cy.get('input[type=email]').type('abluble@gmail.com')
    cy.get('input[type=password]').type('abluble')
    cy.get('button').contains('Entrar').click()

    cy.contains('Login incorreto!')

    cy.get('input[type=email]').clear()
    cy.get('input[type=password]').clear()

    cy.get('input[type=email]').type('admin@admin.com')
    cy.get('input[type=password]').type('admin')
    cy.get('button').contains('Entrar').click()

    cy.location().should((loc) => expect(loc.pathname).to.equal('/inicio'))
  })
})
