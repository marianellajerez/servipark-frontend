import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],  
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.errorMessage = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        console.log('Login exitoso');
      },
      error: (err) => {
        this.errorMessage = 'Credenciales inválidas. Intente de nuevo.';
        console.error('Error de login', err);
      }
    });
  }
}