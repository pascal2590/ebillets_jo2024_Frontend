import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

Chart.register(...registerables);

@Component({
  selector: 'app-admin-offres',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './admin-offres.html',
  styleUrls: ['./admin-offres.css']
})
export class AdminOffresComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  ventes: any[] = [];
  chart: any;
  loading = true;
  error: string | null = null;

  constructor(private http: HttpClient) { }

  ngAfterViewInit() {
    // Petit délai pour être sûr que le template et les données soient prêts
    this.chargerVentes();
  }

  chargerVentes() {
    this.http.get<any[]>(`${environment.apiUrl}/Admin/ventes-par-offre`)
      .subscribe({
        next: (data) => {
          this.ventes = data;
          this.loading = false;

          // Petit délai avant d’appeler le graphique
          setTimeout(() => {
            this.creerGraphique();
          }, 100);
        },
        error: (err) => {
          this.loading = false;
          this.error = "Erreur lors du chargement des ventes.";
          console.error(err);
        }
      });
  }

  get totalNbVentes(): number {
    return this.ventes.reduce((total, v) => total + (v.nbVentes || 0), 0);
  }

  get totalMontant(): number {
    return this.ventes.reduce((total, v) => total + (v.montantTotal || 0), 0);
  }

  creerGraphique() {
    if (!this.chartCanvas?.nativeElement || this.ventes.length === 0) return;

    const ctx = this.chartCanvas.nativeElement.getContext('2d');

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.ventes.map(v => v.nomOffre),
        datasets: [
          {
            label: 'Nombre de ventes',
            data: this.ventes.map(v => v.nbVentes),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'Montant total (€)',
            data: this.ventes.map(v => v.montantTotal),
            backgroundColor: 'rgba(255, 159, 64, 0.6)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' },
          title: {
            display: true,
            text: 'Ventes par offre',
            font: { size: 18 }
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
