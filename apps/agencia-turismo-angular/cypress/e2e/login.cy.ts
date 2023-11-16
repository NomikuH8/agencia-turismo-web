describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/')

    cy.get('input[type=email]').type('abluble@gmail.com')
    cy.get('input[type=password]').type('abluble')

    cy.contains('Login incorreto!')

    cy.get('input[type=email]').type('admin@admin.com')
    cy.get('input[type=password]').type('admin')
  })
})
