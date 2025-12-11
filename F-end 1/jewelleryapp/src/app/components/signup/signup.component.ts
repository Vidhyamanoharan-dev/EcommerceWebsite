import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]  // ✅ Added imports
})
export class SignupComponent {
  signupForm: FormGroup;
  message: string = '';   // ✅ Added
  loading: boolean = false; // ✅ Added

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    // ✅ Initialize form
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onSignup(): void {    // ✅ Correct method name
    if (this.signupForm.valid) {
      this.loading = true;
      this.message = '';

      this.api.signup(this.signupForm.value).subscribe({
        next: () => {
          this.message = 'Signup successful! Please login.';
          this.loading = false;
          alert('Signup successful! Please login.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.message = 'Signup failed. Try again.';
          this.loading = false;
          console.error(err);
        }
      });
    } else {
      this.message = 'Please fill out all required fields.';
    }
  }
}
