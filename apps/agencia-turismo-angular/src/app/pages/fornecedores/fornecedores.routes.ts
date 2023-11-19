import { Routes } from '@angular/router'

export const fornecedoresRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./view-fornecedores/view-fornecedores.component').then(
        (m) => m.ViewFornecedoresComponent,
      ),
  },
  {
    path: 'criar',
    loadComponent: () =>
      import('./view-fornecedores/view-fornecedores.component').then(
        (m) => m.ViewFornecedoresComponent,
      ),
  },
  {
    path: 'editar',
    loadComponent: () =>
      import('./view-fornecedores/view-fornecedores.component').then(
        (m) => m.ViewFornecedoresComponent,
      ),
  },
]
