import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation.html',
  styleUrls: ['./reservation.css']
})
export class Reservation implements OnInit {
  utilisateur: any = null;
  reservations: any[] = [];
  loading = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (!userData) {
      alert('Veuillez vous connecter pour accéder à vos réservations.');
      this.router.navigate(['/connexion']);
      return;
    }

    const user = JSON.parse(userData);
    this.chargerReservations(user.idUtilisateur);
  }

  chargerReservations(idUtilisateur: number): void {
    this.loading = true;
    this.http.get(`${environment.apiUrl}/Reservation/utilisateur/${idUtilisateur}`)
      .subscribe({
        next: (data: any) => {
          this.utilisateur = data.utilisateur;

          // Filtrer les réservations avant tout traitement
          this.reservations = (data.reservations || []).filter(
            (r: any) => r.statut !== 'Payée' && r.Statut !== 'Payée'
          );

          // Convertir en Date et trier par date décroissante
          this.reservations.forEach(res => {
            res.dateReservation = new Date(res.dateReservation);
          });

          this.reservations.sort((a, b) => {
            return b.dateReservation.getTime() - a.dateReservation.getTime();
          });

          console.log('Réservations chargées :', this.reservations);
        },
        error: (err) => {
          console.error('Erreur chargement réservations :', err);
          alert('Impossible de charger vos réservations.');
        },
        complete: () => {
          this.loading = false;
        }        
      });
  }


  retourPanier(): void {
    this.router.navigate(['/panier']);
  }


  // ✅ Nouvelle méthode pour aller vers la page de paiement
  payerReservation(idReservation: number) {
    if (!idReservation) {
      alert('❌ Réservation introuvable.');
      return;
    }

    console.log('🧭 Redirection vers paiement pour réservation :', idReservation);
    this.router.navigate(['/paiement', idReservation]);
  }

  allerPaiement(idReservation: number) {
    this.router.navigate(['/paiement', idReservation]);
  }

  isPayerVisible(reservation: any): boolean {
    try {
      // Si la réservation n’a pas encore de billets, on autorise le paiement
      if (!reservation || !reservation.Billets) {
        return true;
      }

      // Si au moins un billet n’est pas encore payé → on affiche le bouton
      return reservation.Billets.some((b: any) => b.Statut === 'En attente' || b.Statut === 'Valide');
    } catch (e) {
      console.error('Erreur dans isPayerVisible:', e);
      return false;
    }
  }

  retourOffres(): void {
    this.router.navigate(['/offres']);
  }
}
