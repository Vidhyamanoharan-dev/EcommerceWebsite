import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  otpForm: FormGroup;


  otpSent: boolean = false;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(4)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });

  }

  sendEmail(): void {
    if (this.forgotForm.valid) {
      const email = this.forgotForm.value.email;
      this.api.forgotPassword(email).subscribe({
        next: (res: any) => {
          alert(res.message || 'OTP sent successfully');
          this.otpSent = true; // show OTP + reset password form
        },
        error: (err) => {
          alert(err.error?.message || 'Failed to send OTP');
        }
      });
    }
  }
  verifyOtpAndReset(): void {
    if (this.otpForm.invalid) {
      alert("Please fill OTP and password");
      return;
    }

    if (this.otpForm.value.newPassword !== this.otpForm.value.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const payload = {
      email: this.forgotForm.value.email,
      otp: this.otpForm.value.otp,
      newPassword: this.otpForm.value.newPassword
    };

    this.api.verifyOtpAndReset(payload).subscribe({
      next: (res: any) => {
        alert(res.message || "Password reset successful!");
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(err.error?.message || "Failed to reset password");
      }
    });
  }



}
