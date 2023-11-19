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
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'

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
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './view-clientes.component.html',
  styleUrl: './view-clientes.component.scss',
})
export class ViewClientesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'action']
  clientes: ClienteType[] = []
  clientesFiltered: ClienteType[] = []
  loading: boolean = false
  wentError: boolean = false
  filtersGroup: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    email: new FormControl(),
  })

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
        this.filterClientes()
      },
      error: () => {
        const snackBarRef = this._snackBar.open('Algum erro ocorreu!', 'Recarregar tela', {
          duration: 5000,
        })
        snackBarRef.onAction().subscribe(() => this.reloadClientes())
        this.loading = false
      },
    })
  }

  filterClientes(): void {
    this.clientesFiltered = this.clientes
    const id = this.filtersGroup.controls['id'].value
    const name = this.filtersGroup.controls['name'].value
    const email = this.filtersGroup.controls['email'].value

    if (id) {
      this.clientesFiltered = this.clientesFiltered.filter(
        (val) => val.id?.toString().startsWith(id),
      )
    }

    if (name) {
      this.clientesFiltered = this.clientesFiltered.filter(
        (val) => val.nome?.toLowerCase().startsWith(name.toLowerCase()),
      )
    }

    if (email) {
      this.clientesFiltered = this.clientesFiltered.filter(
        (val) => val.email?.toLowerCase().startsWith(email.toLowerCase()),
      )
    }
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
