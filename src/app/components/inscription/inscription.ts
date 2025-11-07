import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inscription.html',
  styleUrls: ['./inscription.css']
})
export class Inscription {
  nom = '';
  prenom = '';
  email = '';
  password = '';
  confirmPassword = '';
  message: string | null = null;
  error: string | null = null;
  loading = false;

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit(): void {
    this.error = null;
    this.message = null;

    if (this.password !== this.confirmPassword) {
      this.error = "Les mots de passe ne correspondent pas.";
      return;
    }

    this.loading = true;

    // 🔹 URL dynamique HTTP pour PC et mobile
    const LOCAL_IP = '192.168.1.196'; // IP de ton PC
    const serverUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
      ? 'http://localhost:5000'
      : `http://${LOCAL_IP}:5000`;

    this.http.post<any>(`${serverUrl}/api/Auth/register`, {
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      password: this.password
    }).subscribe({
      next: res => {
        this.message = res.message || "Compte créé ✅";
        this.loading = false;

        // Redirection après 1 seconde
        setTimeout(() => {
          this.router.navigate(['/connexion']);
        }, 1000);
      },
      error: err => {
        this.error = err.error?.message || "Une erreur est survenue lors de l'inscription.";
        this.loading = false;
      }
    });
  }
}
