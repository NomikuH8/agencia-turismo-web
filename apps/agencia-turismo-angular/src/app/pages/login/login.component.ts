import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatButtonModule } from '@angular/material/button'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { OnInit } from '@angular/core'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })
  hidePassword: boolean = true
  wentWrong: boolean = false

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    const authenticated = sessionStorage.getItem('authenticated')
    if (!authenticated) return

    this.router.navigateByUrl('/inicio')
  }

  onSubmitLogin() {
    if (
      this.loginForm.controls.email.value !== 'admin@admin.com' ||
      this.loginForm.controls.password.value !== 'admin'
    ) {
      this._snackBar.open('Login incorreto!', '', {
        duration: 5000,
      })
      return
    }

    sessionStorage.setItem('authenticated', 'true')
    this.router.navigateByUrl('/inicio')
  }

  getErrorMessageEmail() {
    if (this.loginForm.controls.email.hasError('required')) return 'Você deve inserir um e-mail.'
    if (this.loginForm.controls.email.hasError('email')) return 'E-mail inválido.'
    return ''
  }

  getErrorMessagePassword() {
    if (this.loginForm.controls.password.hasError('required')) return 'Você deve inserir uma senha.'
    return ''
  }
}
