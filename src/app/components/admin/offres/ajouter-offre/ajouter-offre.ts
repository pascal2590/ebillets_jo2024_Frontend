import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-offre',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ajouter-offre.html',
  styleUrls: ['./ajouter-offre.css']
})
export class AjouterOffreComponent {

  // Données du formulaire
  offre = {
    nomOffre: '',
    description: '',
    nbPersonnes: 1,
    prix: 0
  };

  message = '';
  erreur = '';

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    this.erreur = '';
    this.message = '';

    // Vérification simple
    if (!this.offre.nomOffre || this.offre.prix <= 0) {
      this.erreur = "Veuillez remplir tous les champs obligatoires.";
      return;
    }

    this.http.post("http://localhost:5000/api/Offre", this.offre)
      .subscribe({
        next: () => {
          this.message = "Offre ajoutée avec succès !";
          
        },
        error: (err) => {
          console.error(err);
          this.erreur = "Erreur lors de l'ajout de l'offre.";
        }
      });
  }

}
