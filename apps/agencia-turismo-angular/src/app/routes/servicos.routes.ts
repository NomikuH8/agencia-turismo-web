import { Routes } from '@angular/router'

export const servicosRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../pages/servicos/view-servicos/view-servicos.component').then((m) => m.ViewServicosComponent)
  }
]