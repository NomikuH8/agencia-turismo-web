import { Routes } from '@angular/router'

import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component'
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component'
import { fornecedoresRoutes } from './routes/fornecedores.routes'
import { pagamentosRoutes } from './routes/pagamentos.routes'
import { clientesRoutes } from './routes/clientes.routes'
import { servicosRoutes } from './routes/servicos.routes'
import { comprasRoutes } from './routes/compras.routes'

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
        children: clientesRoutes
      },
      {
        path: 'fornecedores',
        children: fornecedoresRoutes
      },
      {
        path: 'servicos',
        children: servicosRoutes
      },
      {
        path: 'compras',
        children: comprasRoutes
      },
      {
        path: 'pagamentos',
        children: pagamentosRoutes
      }
    ],
  },
]
