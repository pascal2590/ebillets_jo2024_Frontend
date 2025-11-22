import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modifier-offre',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modifier-offre.html',
  styleUrls: ['./modifier-offre.css']
})
export class ModifierOffreComponent implements OnInit {

  offres: any[] = [];
  selectedOffreId: number | null = null;
  offre: any = {
    idOffre: 0,
    nomOffre: '',
    description: '',
    nbPersonnes: 1,
    prix: 0
  };

  message = '';
  erreur = '';
  isLoaded = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>("http://localhost:5000/api/Offre")
      .subscribe({
        next: data => {
          this.offres = data;
        },
        error: () => {
          this.erreur = "Impossible de charger la liste des offres.";
        }
      });
  }

  chargerOffre() {
    if (!this.selectedOffreId) return;

    this.http.get(`http://localhost:5000/api/Offre/${this.selectedOffreId}`)
      .subscribe({
        next: data => {
          this.offre = data;
          this.isLoaded = true;
          this.message = '';
          this.erreur = '';
        },
        error: () => {
          this.erreur = "Impossible de charger l'offre.";
        }
      });
  }

  onSubmit() {
    if (!this.offre.nomOffre || this.offre.prix <= 0) {
      this.erreur = "Veuillez remplir les champs obligatoires.";
      return;
    }

    this.http.put(`http://localhost:5000/api/Offre/${this.offre.idOffre}`, this.offre)
      .subscribe({
        next: () => {
          this.message = "Offre mise à jour avec succès !";
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        error: () => {
          this.erreur = "Erreur lors de la mise à jour de l'offre.";
        }
      });
  }

}
