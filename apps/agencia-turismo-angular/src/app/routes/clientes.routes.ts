import { Routes } from '@angular/router'

export const clientesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../pages/clientes/view-clientes/view-clientes.component').then((m) => m.ViewClientesComponent)
  },
  {
    path: 'criar',
    loadComponent: () => import('../pages/clientes/view-clientes/view-clientes.component').then((m) => m.ViewClientesComponent)
  },
  {
    path: 'editar',
    loadComponent: () => import('../pages/clientes/view-clientes/view-clientes.component').then((m) => m.ViewClientesComponent)
  },
]