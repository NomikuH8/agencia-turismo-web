import { Routes } from '@angular/router'

export const clientesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./view-clientes/view-clientes.component').then((m) => m.ViewClientesComponent),
  },
  {
    path: 'criar',
    loadComponent: () =>
      import('./create-clientes/create-clientes.component').then((m) => m.CreateClientesComponent),
    data: {
      mode: 'create',
    },
  },
  {
    path: 'editar',
    loadComponent: () =>
      import('./create-clientes/create-clientes.component').then((m) => m.CreateClientesComponent),
    data: {
      mode: 'edit',
    },
  },
]
