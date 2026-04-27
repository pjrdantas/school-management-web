import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatNativeDateModule } from '@angular/material/core';

interface AlunoCadastroPayload {
  nomeCompleto: string;
  cpf: string;
  dataNascimento: string;
  email: string;
  telefone?: string;
}

@Component({
  selector: 'app-students-new',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './students-new.component.html',
  styleUrls: ['./students-new.component.scss'],
})
export class StudentsNewComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  protected payloadPreview: AlunoCadastroPayload | null = null;

  protected readonly alunoForm = this.fb.nonNullable.group({
    nomeCompleto: ['', [Validators.required]],
    cpf: ['', [Validators.required]],
    dataNascimento: [null as Date | null, [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    telefone: [''],
  });

  protected onSubmit(): void {
    if (this.alunoForm.invalid) {
      this.alunoForm.markAllAsTouched();
      return;
    }

    const formValue = this.alunoForm.getRawValue();
    this.payloadPreview = {
      nomeCompleto: formValue.nomeCompleto.trim(),
      cpf: formValue.cpf.trim(),
      dataNascimento: this.toIsoDate(formValue.dataNascimento),
      email: formValue.email.trim(),
      telefone: formValue.telefone?.trim() || undefined,
    };

    this.snackBar.open('Estrutura de envio pronta para integração (KAN-15).', 'Fechar', {
      duration: 3500,
    });
  }

  protected onCancel(): void {
    this.router.navigate(['/students']);
  }

  private toIsoDate(value: Date | null): string {
    if (!value) {
      return '';
    }

    const timezoneOffsetMs = value.getTimezoneOffset() * 60000;
    return new Date(value.getTime() - timezoneOffsetMs).toISOString().split('T')[0];
  }
}
