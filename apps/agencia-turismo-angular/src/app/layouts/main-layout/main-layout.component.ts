import { MatToolbarModule } from '@angular/material/toolbar'
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { CommonModule } from '@angular/common'
import { Router, RouterOutlet } from '@angular/router'
import { Component, ViewChild } from '@angular/core'

interface ListItemType {
  text: string
  value: string
}

const list: ListItemType[] = [
  {
    text: 'Início',
    value: '/inicio'
  },
  {
    text: 'Clientes',
    value: '/clientes'
  },
  {
    text: 'Fornecedores',
    value: '/fornecedores'
  },
  {
    text: 'Serviços',
    value: '/servicos'
  },
  {
    text: 'Compras',
    value: '/compras'
  },
  {
    text: 'Pagamentos',
    value: '/pagamentos'
  },
]

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  @ViewChild('drawer') drawer: MatDrawer

  drawerList: ListItemType[] = list

  constructor(private router: Router) { }

  goTo(path: string): void {
    this.drawer.close()
    this.router.navigateByUrl(path)
  }
}
