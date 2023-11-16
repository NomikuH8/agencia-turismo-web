describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/')

    cy.get('input[type=email]').type('admin@admin.com')
    cy.get('input[type=password]').type('admin')
    cy.get('button').contains('Entrar').click()
  })

  it('Navigate to inicio', () => {
    cy.get('mat-toolbar>button').click()
    cy.get('button').contains('Início').click()
    cy.location().should((loc) => loc.pathname === '/inicio')
  })

  it('Navigate to clientes', () => {
    cy.get('mat-toolbar>button').click()
    cy.get('button').contains('Clientes').click()
    cy.location().should((loc) => loc.pathname === '/clientes')
  })

  it('Navigate to fornecedores', () => {
    cy.get('mat-toolbar>button').click()
    cy.get('button').contains('Fornecedores').click()
    cy.location().should((loc) => loc.pathname === '/fornecedores')
  })

  it('Navigate to servicos', () => {
    cy.get('mat-toolbar>button').click()
    cy.get('button').contains('Serviços').click()
    cy.location().should((loc) => loc.pathname === '/servicos')
  })

  it('Navigate to compras', () => {
    cy.get('mat-toolbar>button').click()
    cy.get('button').contains('Compras').click()
    cy.location().should((loc) => loc.pathname === '/compras')
  })

  it('Navigate to pagamentos', () => {
    cy.get('mat-toolbar>button').click()
    cy.get('button').contains('Pagamentos').click()
    cy.location().should((loc) => loc.pathname === '/pagamentos')
  })
})