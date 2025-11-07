import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mes-billets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mes-billets.html',
  styleUrls: ['./mes-billets.css']
})
export class MesBillets implements OnInit {
  billets: any[] = [];
  loading = false;
  error: string | null = null;
  utilisateur: any = null;  // ✅ Propriété ajoutée pour le template

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (!userData) {
      this.router.navigate(['/connexion']);
      return;
    }

    this.utilisateur = JSON.parse(userData); // ✅ initialisation
    this.chargerBillets(this.utilisateur.idUtilisateur);
  }

  chargerBillets(idUtilisateur: number): void {
    this.loading = true;
    this.http.get<any[]>(`https://localhost:5001/api/Billet/utilisateur/${idUtilisateur}`).subscribe({
      next: (res) => {
        this.billets = res.sort(
          (a, b) => new Date(b.dateEmission).getTime() - new Date(a.dateEmission).getTime()
        );
        this.loading = false;
        console.log(this.billets); // Vérifie si 'offre' est bien rempli
      },
      error: (err) => {
        console.error(err);
        this.error = "Impossible de récupérer vos billets.";
        this.loading = false;
      }
    });
  }

  // 🔹 Ajout d'un bouton "Retour au panier"
  retourPanier(): void {
    this.router.navigate(['/panier']);
  }
}
