import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

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

  // Rôle par défaut : Client
  role: string = 'Client';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Si l'admin crée un employé, on récupère le rôle depuis la route
    const dataRole = this.route.snapshot.data['role'];
    if (dataRole) {
      this.role = dataRole; // 'Employe'
    }
  }

  onSubmit(): void {
    this.error = null;
    this.message = null;

    if (this.password !== this.confirmPassword) {
      this.error = "Les mots de passe ne correspondent pas.";
      return;
    }

    this.loading = true;

    // 🔹 Utilisation de l'URL relative /api via environment
    this.http.post<any>(`${environment.apiUrl}/Auth/register`, {
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      password: this.password,
      role: this.role // 'Client' ou 'Employe'
    }).subscribe({
      next: res => {
        this.message = res.message || "Compte créé ✅";
        this.loading = false;

        // Redirection après création
        setTimeout(() => {
          if (this.role === 'Employe') {
            this.router.navigate(['/admin/offres']);
          } else {
            this.router.navigate(['/connexion']);
          }
        }, 1000);
      },
      error: err => {
        this.error = err.error?.message || "Une erreur est survenue lors de l'inscription.";
        this.loading = false;
      }
    });
  }
}
