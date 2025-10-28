import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaiementService } from '../../services/paiement.service';

@Component({
  selector: 'app-paiement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paiement.html',
  styleUrls: ['./paiement.css']
})
export class Paiement implements OnInit {

  reservation: any;
  total: number = 0;
  idReservation!: number;
  loading: boolean = false;

  constructor(
    private paiementService: PaiementService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idReservation = Number(this.route.snapshot.paramMap.get('idReservation'));
    console.log('🆔 ID réservation reçu :', this.idReservation);

    if (!this.idReservation) return;

    // 🔹 Charger la réservation depuis l’API
    this.paiementService.getReservation(this.idReservation).subscribe({
      next: (res) => {
        console.log('✅ Réservation chargée :', res);
        this.reservation = res;
        this.total = res.offre?.prix ?? 0;
      },
      error: (err) => {
        console.error('❌ Erreur chargement réservation :', err);
      }
    });
  }

  passerCommande() {
    if (!this.idReservation) {
      alert('❌ Aucune réservation à payer.');
      return;
    }

    this.loading = true;

    this.paiementService.payerReservation(this.idReservation).subscribe({
      next: (res) => {
        console.log('✅ Paiement réussi :', res);
        this.loading = false;
        alert('✅ Paiement effectué avec succès !');
        this.router.navigate(['/mes-billets']);
      },
      error: (err) => {
        console.error('❌ Erreur paiement :', err);
        this.loading = false;
        alert('❌ Erreur lors du paiement. Veuillez réessayer.');
      }
    });
  }

  retourPanier() {
    this.router.navigate(['/panier']);
  }
}
