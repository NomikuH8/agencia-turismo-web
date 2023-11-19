import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatButtonModule } from '@angular/material/button'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatBadgeModule } from '@angular/material/badge'
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { ClienteType } from 'shared'

import { ClientesService } from '../../../services/v1/clientes.service'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { DialogDeleteClientesComponent } from '../dialog-delete-clientes/dialog-delete-clientes.component'

@Component({
  selector: 'app-view-clientes',
  standalone: true,
  imports: [
    CommonModule,
    MatBadgeModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './view-clientes.component.html',
  styleUrl: './view-clientes.component.scss',
})
export class ViewClientesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'action']
  clientes: ClienteType[] = []
  loading: boolean = false
  wentError: boolean = false

  constructor(
    private clientesService: ClientesService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.reloadClientes()
  }

  reloadClientes(): void {
    this.loading = true
    this.clientesService.getClientes().subscribe({
      next: (clientesReturned) => {
        this.clientes = []
        for (const cliente of clientesReturned) {
          if (!cliente.deletado) this.clientes.push(cliente)
        }
        this.loading = false
      },
      error: (err) => {
        const snackBarRef = this._snackBar.open('Algum erro ocorreu!', 'Recarregar tela', {
          duration: 5000,
        })
        snackBarRef.onAction().subscribe(() => this.reloadClientes())
        this.loading = false
      },
    })
  }

  createCliente(): void {
    this.router.navigateByUrl('/clientes/criar')
  }

  editCliente(cliente: ClienteType): void {
    this.router.navigateByUrl('/clientes/editar', {
      state: {
        cliente,
      },
    })
  }

  deleteCliente(cliente: ClienteType): void {
    const dialogRef = this.dialog.open(DialogDeleteClientesComponent)
    dialogRef.afterClosed().subscribe((value: boolean) => {
      if (!cliente.id) return
      if (!value) return

      this.clientesService.deleteCliente(cliente.id).subscribe((val) => {
        if (val.success) this.reloadClientes()
      })
    })
  }
}
