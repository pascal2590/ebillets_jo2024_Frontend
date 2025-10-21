import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offres',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './offres.html',
  styleUrls: ['./offres.css']
})
export class Offres implements OnInit {
  offres: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.chargerOffres();
  }

  chargerOffres(): void {
    this.loading = true;
    this.error = null;

    this.http.get<any[]>('http://192.168.1.196:5000/api/Offre').subscribe({
      next: res => {
        this.offres = res;
        this.loading = false;
      },
      error: err => {
        this.error = 'Impossible de charger les offres.';
        this.loading = false;
      }
    });
  }

  ajouterAuPanier(offre: any): void {
    const user = localStorage.getItem('user');

    // ✅ Si l'utilisateur n'est pas connecté
    if (!user) {
      const aUnCompte = confirm(
        "⚠️ Vous devez être connecté pour ajouter une offre au panier.\n\n" +
        "Avez-vous déjà un compte ?\n\n" +
        "👉 Sélectionner OK si OUI\n" +
        "👉 Sélectionner Annuler pour créer un compte"
      );

      if (aUnCompte) {
        // Redirection vers la page de connexion
        localStorage.setItem('pendingOffer', JSON.stringify(offre));
        this.router.navigate(['/connexion']);
      } else {
        // Redirection vers la page d’inscription
        localStorage.setItem('pendingOffer', JSON.stringify(offre));
        this.router.navigate(['/inscription']);
      }

      return;
    }

    // ✅ Si l'utilisateur est connecté
    this.ajouterOffreDansPanier(offre);
  }

  ajouterOffreDansPanier(offre: any): void {
    // On récupère le panier existant ou on le crée
    const panier = JSON.parse(localStorage.getItem('panier') || '[]');

    // Vérifie si l'offre existe déjà
    const existe = panier.find((item: any) => item.idOffre === offre.idOffre);
    if (!existe) {
      panier.push(offre);
      localStorage.setItem('panier', JSON.stringify(panier));
      alert(`✅ "${offre.nomOffre}" a été ajouté au panier.`);
    } else {
      alert(`ℹ️ "${offre.nomOffre}" est déjà dans votre panier.`);
    }
  }
}
