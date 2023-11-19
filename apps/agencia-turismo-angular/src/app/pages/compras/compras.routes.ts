import { Routes } from '@angular/router'

export const comprasRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./view-compras/view-compras.component').then((m) => m.ViewComprasComponent),
  },
]
