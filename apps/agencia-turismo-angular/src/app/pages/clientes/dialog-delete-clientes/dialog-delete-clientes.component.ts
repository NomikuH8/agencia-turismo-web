import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'

@Component({
  selector: 'app-dialog-delete-clientes',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './dialog-delete-clientes.component.html',
  styleUrl: './dialog-delete-clientes.component.scss',
})
export class DialogDeleteClientesComponent {
  constructor(private dialogRef: MatDialogRef<DialogDeleteClientesComponent>) {}

  onConfirmClick(): void {
    this.dialogRef.close(true)
  }

  onCancelClick(): void {
    this.dialogRef.close(false)
  }
}
