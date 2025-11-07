import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanierService } from '../../services/panier.service'; // 🧩 à ajuster selon ton chemin réel
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

  constructor(
    private panierService: PanierService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.chargerPanier();
  }

  /** 🔹 Recharge les données du panier depuis l'API' */
  chargerPanier(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user || !user.idUtilisateur) {
      this.panier = [];
      return;
    }

    this.panierService.getPanierFromApi(user.idUtilisateur).subscribe({
      next: (res) => {
        console.log('📦 Panier chargé depuis l’API:', res);

        // Le backend renvoie un objet Panier avec une liste PaniersOffres
        this.panier = res.paniersOffres?.map((po: any) => ({
          idOffre: po.offre.idOffre,
          nomOffre: po.offre.nomOffre,
          prix: po.offre.prix,
          quantite: po.quantite
        })) || [];
      },
      error: (err) => {
        console.error('❌ Erreur lors du chargement du panier:', err);
        this.panier = [];
      }
    });
  }


  /** 🔹 Supprime une offre du panier coté serveur et côt*/
  supprimer(idOffre: number): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || !user.idUtilisateur) {
      alert('⚠️ Vous devez être connecté pour supprimer une offre du panier.');
      return;
    }

    this.panierService.supprimerServeur(user.idUtilisateur, idOffre).subscribe({
      next: (res) => {
        console.log('✅ Supprimé du serveur :', res);
        this.panierService.supprimer(idOffre); // Supprime aussi localement
        this.chargerPanier();
      },
      error: (err) => {
        console.error('❌ Erreur suppression panier :', err);
        alert('Une erreur est survenue lors de la suppression.');
      }
    });
  }


  /** 🔹 Vide complètement le panier */
  vider(): void {
    if (confirm('Voulez-vous vraiment vider votre panier ?')) {
      // 🔹 Suppression du panier dans le localStorage
      localStorage.removeItem('panier');

      // 🔹 Réinitialisation du tableau local
      this.panier = [];

      alert('🗑️ Panier vidé avec succès.');
    }
  }


  /** 🔹 Envoie le panier à l’API ASP.NET Core pour créer les réservations */
  ouvrirReservation(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user || !user.idUtilisateur) {
      alert('⚠️ Vous devez être connecté pour finaliser la réservation.');
      return;
    }

    this.panierService.commander(user.idUtilisateur).subscribe({
      next: async (res: any) => {
        console.log('✅ Réponse API:', res);

        // Supprimer chaque offre commandée côté serveur
        for (let item of this.panier) {
          await this.panierService.supprimerOffre(user.idUtilisateur, item.idOffre).toPromise();
        }

        // Supprimer localement
        this.panierService.vider();
        this.panier = [];

        alert('🎉 Votre commande a été enregistrée avec succès !');

        // Redirection
        this.router.navigate(['/reservation']);
      },
      error: (err) => {
        console.error('❌ Erreur API:', err);
        alert('Une erreur est survenue lors de la réservation.');
      }
    });
  }
}


