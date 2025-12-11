import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading: boolean = false;
  errorMsg: string = '';

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.api.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log('Login successful', res);
          this.loading = false;
          // Navigate to homepage or dashboard after login
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          this.errorMsg = 'Invalid email or password';
          this.loading = false;
        }
      });
    }
  }

  goToSignup(): void {
    this.router.navigate(['/signup']);
  }

  goToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }
}
