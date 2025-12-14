import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanierService } from '../../services/panier.service';
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
  panier: any[] = [];
  loading = false;

  constructor(
    private panierService: PanierService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.chargerPanier();
  }

  /** 🔹 Recharge le panier depuis l’API */
  chargerPanier(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user?.idUtilisateur) {
      this.panier = [];
      return;
    }

    this.loading = true;
    this.panierService.getPanierFromApi(user.idUtilisateur).subscribe({
      next: (res) => {
        console.log('📦 Panier chargé depuis l’API:', res);
        this.panier = res.paniersOffres?.map((po: any) => ({
          idOffre: po.offre.idOffre,
          nomOffre: po.offre.nomOffre,
          prix: po.offre.prix,
          quantite: po.quantite
        })) || [];
      },
      error: (err) => {
        console.error('❌ Erreur chargement panier:', err);
        this.panier = [];
      },
      complete: () => this.loading = false
    });
  }

  /** 🔹 Supprime une offre du panier côté serveur et localement */
  supprimer(idOffre: number): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user?.idUtilisateur) {
      alert('⚠️ Vous devez être connecté pour supprimer une offre du panier.');
      return;
    }

    this.panierService.supprimerServeur(user.idUtilisateur, idOffre).subscribe({
      next: () => {
        this.panierService.supprimer(idOffre);
        this.chargerPanier();
      },
      error: (err) => {
        console.error('❌ Erreur suppression panier:', err);
        alert('Une erreur est survenue lors de la suppression.');
      }
    });
  }

  /** 🔹 Vide complètement le panier */
  vider(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user?.idUtilisateur) {
      alert('⚠️ Vous devez être connecté pour vider le panier.');
      return;
    }

    if (!confirm('Voulez-vous vraiment vider votre panier ?')) return;

    this.panierService.viderServeur(user.idUtilisateur).subscribe({
      next: () => {
        this.panierService.vider();
        this.panier = [];
        alert('🗑️ Panier vidé avec succès.');
      },
      error: (err) => {
        console.error('❌ Erreur vidage panier:', err);
        alert('Une erreur est survenue lors du vidage du panier.');
      }
    });
  }

  /** 🔹 Crée les réservations et vide le panier */
  ouvrirReservation(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user?.idUtilisateur) {
      alert('⚠️ Vous devez être connecté pour finaliser la réservation.');
      return;
    }

    this.panierService.commander(user.idUtilisateur).subscribe({
      next: async (res: any) => {
        console.log('✅ Réponse API:', res);

        // Supprimer chaque offre côté serveur
        for (let item of this.panier) {
          await this.panierService.supprimerOffre(user.idUtilisateur, item.idOffre).toPromise();
        }

        // Supprime localement
        this.panierService.vider();
        this.panier = [];

        alert('🎉 Votre commande a été enregistrée avec succès !');
        this.router.navigate(['/reservation']);
      },
      error: (err) => {
        console.error('❌ Erreur création réservation:', err);
        alert('Une erreur est survenue lors de la réservation.');
      }
    });
  }
}
