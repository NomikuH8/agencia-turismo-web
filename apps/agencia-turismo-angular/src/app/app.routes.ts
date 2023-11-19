import { Routes } from '@angular/router'

import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component'
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component'
import { fornecedoresRoutes } from './pages/fornecedores/fornecedores.routes'
import { pagamentosRoutes } from './pages/pagamentos/pagamentos.routes'
import { clientesRoutes } from './pages/clientes/clientes.routes'
import { servicosRoutes } from './pages/servicos/servicos.routes'
import { comprasRoutes } from './pages/compras/compras.routes'
import { forceLoginGuard } from './guards/force-login.guard'

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
        canActivate: [forceLoginGuard],
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'clientes',
        canActivate: [forceLoginGuard],
        children: clientesRoutes,
      },
      {
        path: 'fornecedores',
        canActivate: [forceLoginGuard],
        children: fornecedoresRoutes,
      },
      {
        path: 'servicos',
        canActivate: [forceLoginGuard],
        children: servicosRoutes,
      },
      {
        path: 'compras',
        canActivate: [forceLoginGuard],
        children: comprasRoutes,
      },
      {
        path: 'pagamentos',
        canActivate: [forceLoginGuard],
        children: pagamentosRoutes,
      },
    ],
  },
]
