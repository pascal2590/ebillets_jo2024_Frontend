import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PanierService } from '../../services/panier.service';

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

  constructor(
    private http: HttpClient,
    private router: Router,
    private panierService: PanierService
  ) { }

  ngOnInit(): void {
    this.chargerOffres();
  }

  chargerOffres(): void {
    this.loading = true;
    this.http.get<any[]>('http://192.168.1.196:5000/api/Offre').subscribe({
      next: (res) => {
        this.offres = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Impossible de charger les offres.';
        this.loading = false;
      }
    });
  }

  ajouterAuPanier(offre: any): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user || !user.idUtilisateur) {
      alert('⚠️ Vous devez être connecté pour ajouter au panier.');
      return;
    }

    // 🔹 Vérifie dans le localStorage si l’offre existe déjà
    const panier = JSON.parse(localStorage.getItem('panier') || '[]');
    const dejaDansPanier = panier.some((item: any) => item.idOffre === offre.idOffre);

    if (dejaDansPanier) {
      alert(`ℹ️ "${offre.nomOffre}" est déjà dans votre panier.`);
      return; // ✅ on stoppe ici si doublon
    }

    // 🔹 Sinon, on appelle l’API et on ajoute localement
    this.panierService.ajouterAuPanier(user.idUtilisateur, offre.idOffre).subscribe({
      next: () => {
        this.panierService.ajouterLocal(offre); // ✅ affichage instantané
        alert(`✅ "${offre.nomOffre}" a été ajoutée au panier !`);
      },
      error: (err) => {
        console.error('❌ Erreur ajout panier:', err);
        alert('Erreur lors de l’ajout au panier.');
      }
    });
  }
}
