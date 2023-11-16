import { Routes } from '@angular/router'
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component'
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component'

export const routes: Routes = [
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'entrar',
      },
      {
        path: 'entrar',
        loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
      },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'inicio',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'clientes',
        loadComponent: () => import('./pages/clientes/view-clientes/view-clientes.component').then((m) => m.ViewClientesComponent)
      },
      {
        path: 'fornecedores',
        loadComponent: () => import('./pages/fornecedores/view-fornecedores/view-fornecedores.component').then((m) => m.ViewFornecedoresComponent)
      },
      {
        path: 'servicos',
        loadComponent: () => import('./pages/servicos/view-servicos/view-servicos.component').then((m) => m.ViewServicosComponent)
      },
      {
        path: 'compras',
        loadComponent: () => import('./pages/compras/view-compras/view-compras.component').then((m) => m.ViewComprasComponent)
      },
      {
        path: 'pagamentos',
        loadComponent: () => import('./pages/pagamentos/view-pagamentos/view-pagamentos.component').then((m) => m.ViewPagamentosComponent)
      }
    ],
  },
]
