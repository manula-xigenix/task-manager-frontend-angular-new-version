import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, NgIf],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  title = signal('Task Management');

  // Make router public so template can use it
  constructor(public auth: AuthService, public router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']); 
  }
}
