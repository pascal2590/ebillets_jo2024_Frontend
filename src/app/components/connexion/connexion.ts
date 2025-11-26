import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

    // 🔹 Détection automatique du protocole et IP
    const LOCAL_IP = '192.168.1.196'; // IP du PC sur le réseau local
    let protocol = 'https';
    let apiPort = 5001;

    // Si le certificat auto-signé n’est pas accepté sur le mobile, basculer en HTTP
    if (!this.isLocalhost()) {
      protocol = 'http';
      apiPort = 5000;
    }

    const serverUrl = this.isLocalhost()
      ? `${protocol}://localhost:${apiPort}`   // PC local
      : `${protocol}://${LOCAL_IP}:${apiPort}`; // Smartphone

    this.authService.login(this.email, this.password, serverUrl).subscribe({
      next: res => {
        this.loading = false;
        this.message = 'Connexion réussie ✅';
        if (res.utilisateur) this.authService.setUser(res.utilisateur);
        this.router.navigate(['/']);
      },
      error: err => {
        this.loading = false;

        // Gestion spécifique des erreurs réseau / certificat
        if (err.error instanceof ProgressEvent) {
          this.error = `Impossible de joindre le serveur. Vérifie le réseau ou l'URL (${serverUrl}).`;
        } else if (err.error && err.error.message) {
          this.error = err.error.message;
        } else {
          this.error = 'Email ou mot de passe incorrect.';
        }
      }
    });
  }

  // Vérifie si l'app tourne sur localhost (PC)
  private isLocalhost(): boolean {
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  }
}
