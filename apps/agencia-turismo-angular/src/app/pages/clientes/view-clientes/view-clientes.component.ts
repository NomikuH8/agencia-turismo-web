import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatBadgeModule } from '@angular/material/badge'
import { MatTableModule } from '@angular/material/table'
import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ClienteType } from 'shared'

import { ClientesService } from '../../../services/v1/clientes.service'

@Component({
  selector: 'app-view-clientes',
  standalone: true,
  imports: [CommonModule, MatBadgeModule, MatTableModule, MatProgressSpinnerModule],
  templateUrl: './view-clientes.component.html',
  styleUrl: './view-clientes.component.scss',
})
export class ViewClientesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email']
  clientes: ClienteType[] = []
  loading: boolean = false

  constructor(
    private clientesService: ClientesService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loading = true
    this.clientesService.getClientes().subscribe({
      next: (clientesReturned) => {
        this.clientes = []
        for (const cliente of clientesReturned) {
          if (!cliente.deletado) this.clientes.push(cliente)
        }
      },
      error: (err) => {
        this._snackBar.open('Algum erro ocorreu!', 'Recarregar tela', {
          duration: 5000,
        })
        console.error(err)
      },
      complete: () => {
        this.loading = false
      },
    })
    //   }
    // )
  }
}
