import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './connexion.html',
  styleUrls: ['./connexion.css']
})
export class Connexion {
  email = '';
  password = '';
  message: string | null = null;
  error: string | null = null;
  loading = false;

  constructor(private http: HttpClient, private router: Router) { }

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

        // ✅ Sauvegarde du token (s'il est renvoyé par ton API)
        if (res.token) {
          localStorage.setItem('token', res.token);
        }

        // ✅ Sauvegarde du user (optionnel)
        if (res.utilisateur) {
          localStorage.setItem('user', JSON.stringify(res.utilisateur));
        }

        // ✅ Redirection vers l'accueil + recharge du menu
        setTimeout(() => {
          this.router.navigate(['/']);
          window.location.reload(); // force la mise à jour du menu
        }, 1000);
      },
      error: err => {
        this.loading = false;
        this.error = err.error?.message || "Email ou mot de passe incorrect.";
      }
    });
  }
}
