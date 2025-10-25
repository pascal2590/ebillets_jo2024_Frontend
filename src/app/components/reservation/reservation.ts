import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
    this.http.get(`http://localhost:5000/api/Reservation/utilisateur/${idUtilisateur}`)
      .subscribe({
        next: (data: any) => {
          this.utilisateur = data.utilisateur;
          this.reservations = data.reservations;
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
}
