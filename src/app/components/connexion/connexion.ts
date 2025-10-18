import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // ← ton service AuthService

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './connexion.html',
  styleUrls: ['./connexion.css']
})
export class Connexion {
  email = '';
  password = '';
  message: string | null = null;
  error: string | null = null;
  loading = false;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  onSubmit(): void {
    this.error = null;
    this.message = null;
    this.loading = true;

    this.http.post<any>('https://localhost:5001/api/Auth/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: res => {
        this.loading = false;
        this.message = "Connexion réussie ✅";

        // 🔹 Sauvegarde du token si nécessaire
        if (res.token) {
          localStorage.setItem('token', res.token);
        }

        // 🔹 Sauvegarde et notification via AuthService
        if (res.utilisateur) {
          this.authService.login(res.utilisateur);
        }

        // 🔹 Redirection vers l'accueil (SPA fluide)
        this.router.navigate(['/']);
      },
      error: err => {
        this.loading = false;
        this.error = err.error?.message || "Email ou mot de passe incorrect.";
      }
    });
  }
}
