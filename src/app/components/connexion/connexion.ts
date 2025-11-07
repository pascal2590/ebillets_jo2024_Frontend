import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

    // 🔹 URL dynamique HTTP pour PC et mobile
    const LOCAL_IP = '192.168.1.196'; // IP de ton PC
    const serverUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
      ? 'http://localhost:5000'
      : `http://${LOCAL_IP}:5000`;

    this.http.post<any>(`${serverUrl}/api/Auth/login`, {
      email: this.email,
      password: this.password
    }).subscribe({
      next: res => {
        this.loading = false;
        this.message = "Connexion réussie ✅";

        if (res.token) {
          localStorage.setItem('token', res.token);
        }

        if (res.utilisateur) {
          this.authService.login(res.utilisateur);
        }

        this.router.navigate(['/']);
      },
      error: err => {
        this.loading = false;
        this.error = err.error?.message || "Email ou mot de passe incorrect.";
      }
    });
  }
}
