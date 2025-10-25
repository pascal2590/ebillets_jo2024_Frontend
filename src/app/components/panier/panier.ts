// src/app/components/panier/panier.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PanierService } from '../../services/panier.service';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panier.html',
  styleUrls: ['./panier.css']
})
export class Panier implements OnInit {
  panier: any[] = [];
  loading = false;

  constructor(
    private panierService: PanierService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.panier = this.panierService.getPanier();
  }

  supprimer(idOffre: number): void {
    this.panierService.supprimer(idOffre);
    this.panier = this.panierService.getPanier();
  }

  vider(): void {
    this.panierService.vider();
    this.panier = [];
  }

  ouvrirReservation(): void {
    const userData = localStorage.getItem('user');
    if (!userData) {
      alert('Veuillez vous connecter pour réserver.');
      this.router.navigate(['/connexion']);
      return;
    }

    const user = JSON.parse(userData);
    const panier = this.panierService.getPanier();

    if (panier.length === 0) {
      alert('Votre panier est vide.');
      return;
    }

    const requete = {
      idUtilisateur: user.idUtilisateur,
      panier: panier.map(o => ({
        idOffre: o.idOffre,
        quantite: 1
      }))
    };

    this.loading = true;
    this.http.post('http://localhost:5000/api/Reservation/commander', requete)
      .subscribe({
        next: () => {
          this.panierService.vider();
          this.router.navigate(['/reservation']);
        },
        error: (err) => {
          console.error('Erreur réservation :', err);
          alert('Une erreur est survenue lors de la réservation.');
        },
        complete: () => this.loading = false
      });
  }

}
