import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  user: any = null;
  isAdmin: boolean = false;
  isEmploye: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user; // Client connecté ou null
      this.isAdmin = user && user.role === 2;   // Administrateur
      this.isEmploye = user && user.role === 1; // Employé
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/accueil']);
  }
}
