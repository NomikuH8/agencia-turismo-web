import { Routes } from '@angular/router'

export const comprasRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../pages/compras/view-compras/view-compras.component').then((m) => m.ViewComprasComponent)
  }
]