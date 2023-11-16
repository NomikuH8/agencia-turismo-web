import { Routes } from '@angular/router'

export const fornecedoresRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../pages/fornecedores/view-fornecedores/view-fornecedores.component').then((m) => m.ViewFornecedoresComponent)
  },
  {
    path: 'criar',
    loadComponent: () => import('../pages/fornecedores/view-fornecedores/view-fornecedores.component').then((m) => m.ViewFornecedoresComponent)
  },
  {
    path: 'editar',
    loadComponent: () => import('../pages/fornecedores/view-fornecedores/view-fornecedores.component').then((m) => m.ViewFornecedoresComponent)
  },
]