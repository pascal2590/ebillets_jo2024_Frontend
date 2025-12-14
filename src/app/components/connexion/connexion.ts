import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './connexion.html',
  styleUrls: ['./connexion.css']
})
export class Connexion {
  email = '';
  password = '';
  message: string | null = null;
  error: string | null = null;
  loading = false;

  constructor(private router: Router, private authService: AuthService) { }

  onSubmit(): void {
    this.error = null;
    this.message = null;
    this.loading = true;

    // 🔹 Appel du service login avec les bonnes URLs (environment.apiUrl)
    this.authService.login(this.email, this.password).subscribe({
      next: res => {
        this.loading = false;
        this.message = 'Connexion réussie ✅';
        if (res.utilisateur) this.authService.setUser(res.utilisateur);
        this.router.navigate(['/']);
      },
      error: err => {
        this.loading = false;

        // Gestion des erreurs réseau / certificat
        if (err.error instanceof ProgressEvent) {
          this.error = 'Impossible de joindre le serveur. Vérifie le réseau ou l\'URL.';
        } else if (err.error && err.error.message) {
          this.error = err.error.message;
        } else {
          this.error = 'Email ou mot de passe incorrect.';
        }
      }
    });
  }
}
