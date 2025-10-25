import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-paiement',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './paiement.html',
  styleUrls: ['./paiement.css']
})
export class Paiement implements OnInit {
  panier: any[] = [];
  total = 0;
  loading = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    const data = localStorage.getItem('panier');
    this.panier = data ? JSON.parse(data) : [];
    this.total = this.panier.reduce((sum, offre) => sum + (offre.prix || 0), 0);

    // Protection : si le panier est vide
    if (this.panier.length === 0) {
      this.toast.show('Votre panier est vide.', 'info');
      this.router.navigate(['/offres']);
    }
  }

  passerCommande(): void {
    const userData = localStorage.getItem('user');
    if (!userData) {
      this.toast.show('Vous devez être connecté pour passer une commande.', 'error');
      this.router.navigate(['/connexion']);
      return;
    }

    const user = JSON.parse(userData);

    const billets = this.panier.map(offre => ({
      idOffre: offre.idOffre,
      idUtilisateur: user.idUtilisateur,
      dateCommande: new Date(),
      quantite: 1
    }));

    this.loading = true;    

    this.http.post('https://localhost:5001/api/Billet', billets).subscribe({
      next: () => {
        this.toast.show('🎟️ Commande effectuée avec succès ! Vos billets ont été créés.', 'success');
        localStorage.removeItem('panier');
        this.loading = false;

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (err) => {
        console.error(err);
        this.toast.show("Une erreur est survenue lors de la commande.", 'error');
        this.loading = false;
      }
    });
  }

  retourPanier(): void {
    this.router.navigate(['/panier']);
  }
}
