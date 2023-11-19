import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router'
import { ClienteType } from 'shared'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { ClientesService } from '../../../services/v1/clientes.service'
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'

@Component({
  selector: 'app-create-clientes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './create-clientes.component.html',
  styleUrl: './create-clientes.component.scss',
})
export class CreateClientesComponent implements OnInit {
  loading: boolean = false
  id: number = -1
  mode: 'create' | 'edit' = 'create'
  formGroup: FormGroup = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private clientesService: ClientesService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.mode = this.activatedRoute.snapshot.data['mode']

    if (this.mode === 'edit') {
      const cliente: ClienteType = history.state.cliente

      if (cliente.id) this.id = cliente.id

      this.formGroup = new FormGroup({
        nome: new FormControl(cliente.nome, [Validators.required]),
        email: new FormControl(cliente.email, [Validators.required, Validators.email]),
      })
    }
  }

  getErrorMessageNome(): string {
    if (this.formGroup.controls['nome'].hasError('required')) return 'É necessário um nome'

    return ''
  }

  getErrorMessageEmail(): string {
    if (this.formGroup.controls['email'].hasError('required')) return 'É necessário um e-mail'

    if (this.formGroup.controls['email'].hasError('email')) return 'E-mail inválido'

    return ''
  }

  submitForm(): void {
    const nome = this.formGroup.controls['nome'].value
    const email = this.formGroup.controls['email'].value
    this.loading = true

    if (this.mode === 'create') {
      this.clientesService
        .postCliente({
          nome,
          email,
        })
        .subscribe({
          next: (value) => {
            if (value.id) this.router.navigateByUrl('/clientes')
          },
          error: (err) => {
            console.error(err)
            this.openErrorSnackBar()
          },
        })
    }

    if (this.mode === 'edit') {
      this.clientesService
        .putCliente(this.id, {
          nome,
          email,
        })
        .subscribe({
          next: (value) => {
            if (value.success) this.router.navigateByUrl('/clientes')
          },
          error: (err) => {
            console.error(err)
            this.openErrorSnackBar()
          },
        })
    }
  }

  openErrorSnackBar(): void {
    this._snackBar.open('Não foi possível inserir cliente', '', {
      duration: 3000,
    })
  }

  onClickVoltar(): void {
    history.back()
  }
}
