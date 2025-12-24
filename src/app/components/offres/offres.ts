import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PanierService, PanierOffre } from '../../services/panier.service';
import { environment } from '../../../environments/environment';

export interface Offre {
  idOffre: number;
  nomOffre: string;
  description?: string;
  prix: number;
  nbPersonnes: number;
}

@Component({
  selector: 'app-offres',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './offres.html',
  styleUrls: ['./offres.css']
})
export class Offres implements OnInit {
  offres: Offre[] = [];
  loading = false;
  error: string | null = null;
  isAdmin = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private panierService: PanierService
  ) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.isAdmin = user && user.role === 2;
    this.chargerOffres();
  }

  chargerOffres(): void {
    this.loading = true;
    this.http.get<Offre[]>(`${environment.apiUrl}/Offre`).subscribe({
      next: (res: Offre[]) => {
        this.offres = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Impossible de charger les offres.';
        this.loading = false;
      }
    });
  }

  ajouterAuPanier(offre: Offre): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user || !user.idUtilisateur) {
      alert('⚠️ Vous devez être connecté pour ajouter au panier.');
      return;
    }

    const panierItem: PanierOffre = {
      idOffre: offre.idOffre,
      nomOffre: offre.nomOffre,
      prix: offre.prix,
      quantite: 1
    };

    this.panierService.ajouterAuPanier(user.idUtilisateur, offre.idOffre, 1)
      .subscribe({
        next: () => {
          alert(`✅ "${offre.nomOffre}" a été ajoutée au panier !`);
          this.panierService.ajouterLocal(panierItem);
        },
        error: (err: any) => {
          if (err.status === 409) {
            alert(`ℹ️ "${offre.nomOffre}" est déjà dans votre panier.`);
          } else {
            console.error('❌ Erreur ajout panier:', err);
            alert('Erreur lors de l’ajout au panier.');
          }
        }
      });
  }
}
