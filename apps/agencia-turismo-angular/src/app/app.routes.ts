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
    ],
  },
]
