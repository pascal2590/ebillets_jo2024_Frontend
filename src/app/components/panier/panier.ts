import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanierService, PanierOffre } from '../../services/panier.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './panier.html',
  styleUrls: ['./panier.css']
})
export class PanierComponent implements OnInit {
  panier: PanierOffre[] = [];
  loading = false;

  constructor(
    private panierService: PanierService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.chargerPanier();
  }

  chargerPanier(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user?.idUtilisateur) {
      this.panier = [];
      return;
    }

    this.panierService.getPanierFromApi(user.idUtilisateur).subscribe({
      next: (res) => {
        console.log('🛒 PANIER FINAL =', res);
        this.panier = res;
      },
      error: (err) => {
        console.error('❌ Erreur chargement panier', err);
        this.panier = [];
      }
    });
  }



  supprimer(idOffre: number): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user?.idUtilisateur) return;

    this.panierService.supprimerServeur(user.idUtilisateur, idOffre).subscribe({
      next: () => this.chargerPanier(),
      error: (err: any) => {
        console.error('❌ Erreur suppression panier:', err);
        alert('Une erreur est survenue lors de la suppression.');
      }
    });
  }

  vider(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user?.idUtilisateur) return;

    if (!confirm('Voulez-vous vraiment vider votre panier ?')) return;

    this.panierService.viderServeur(user.idUtilisateur).subscribe({
      next: () => this.panier = [],
      error: (err: any) => {
        console.error('❌ Erreur vidage panier:', err);
        alert('Une erreur est survenue lors du vidage du panier.');
      }
    });
  }

  ouvrirReservation(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user?.idUtilisateur) {
      alert('⚠️ Vous devez être connecté pour finaliser la réservation.');
      return;
    }

    this.panierService.commander(user.idUtilisateur).subscribe({
      next: async (res: any) => {
        console.log('✅ Réponse API réservation:', res);

        // Supprimer chaque offre côté serveur
        for (let item of this.panier) {
          await this.panierService.supprimerServeur(user.idUtilisateur, item.idOffre).toPromise();
        }

        // Supprime localement
        this.panierService.vider();
        this.panier = [];

        alert('🎉 Votre commande a été enregistrée avec succès !');
        this.router.navigate(['/reservation']);
      },
      error: (err: any) => {
        console.error('❌ Erreur création réservation:', err);
        alert('Une erreur est survenue lors de la réservation.');
      }
    });
  }
}
