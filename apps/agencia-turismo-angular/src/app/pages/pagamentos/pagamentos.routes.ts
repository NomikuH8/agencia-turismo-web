import { Routes } from '@angular/router'

export const pagamentosRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./view-pagamentos/view-pagamentos.component').then((m) => m.ViewPagamentosComponent),
  },
]
