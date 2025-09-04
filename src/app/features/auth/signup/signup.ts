import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class SignupComponent {
  username = '';
  password = '';
  errorMessage = '';
  successMessage = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  onRegister() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter username and password';
      return;
    }
    this.errorMessage = '';
    this.loading = true;

    this.auth.register(this.username, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'User registered successfully!';
        this.router.navigate(['/login']);
        // redirect to login after a delay
        // setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.loading = false;

        if (typeof err?.error === 'string') {
          this.errorMessage = err.error; 
        } else if (err?.error?.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Registration failed. Please check your input.';
        }
      }

    });
  }
}
