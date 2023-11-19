describe('CRUD Clientes', () => {
  beforeEach(() => {
    cy.visit('localhost:4200')

    cy.get('input[type=email]').type('admin@admin.com')
    cy.get('input[type=password]').type('admin')

    cy.get('button').contains('Entrar').click()

    cy.visit('localhost:4200/clientes')
  })

  it('Create cliente', () => {
    cy.get('button').contains('Criar novo cliente').click()

    cy.location().should((loc) => loc.pathname === '/clientes/criar')

    cy.get('input[formcontrolname=nome]').type('Manseira')
    cy.get('input[formcontrolname=email]').type('manseira@gmail.com')

    cy.get('button').contains('Criar').click()
  })

  it('Edit cliente', () => {
    cy.get('input[formcontrolname=name]').type('Manseira{enter}')

    cy.location().should((loc) => loc.pathname === '/clientes/editar')

    cy.get(
      ':nth-child(1) > .cdk-column-action > .mat-mdc-menu-trigger > .mat-mdc-button-touch-target',
    ).click()
    cy.get('button').contains('Editar').click()

    cy.get('input[formcontrolname=nome]').clear().type('Novo Manseira{enter}')

    cy.location().should((loc) => loc.pathname === '/clientes')
  })

  it('Delete cliente', () => {
    cy.get('input[formcontrolname=name]').type('Novo Manseira{enter}')

    cy.get(
      ':nth-child(1) > .cdk-column-action > .mat-mdc-menu-trigger > .mat-mdc-button-touch-target',
    ).click()

    cy.get('button').contains('Excluir').click()

    cy.get('button').contains('Sim, excluir').click()
  })
})
