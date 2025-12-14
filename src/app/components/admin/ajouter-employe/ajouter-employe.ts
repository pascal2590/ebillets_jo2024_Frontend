import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// ⬅ Import requis pour ngModel
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// ⬅ Import de l'environnement pour accéder à l'IP du serveur
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-ajouter-employe',
  standalone: true, // ⬅ Indispensable
  templateUrl: './ajouter-employe.html',
  imports: [
    CommonModule,
    FormsModule // ⬅ Active ngModel et ngForm
  ]
})
export class AjouterEmployeComponent {

  employe = {
    nom: "",
    prenom: "",
    email: "",
    motDePasse: ""
  };

  constructor(private http: HttpClient) { }

  creerEmploye() {
    this.http.post(`${environment.apiUrl}/utilisateur/creer-employe`, this.employe)
      .subscribe({
        next: () => alert("Employé créé avec succès !"),
        error: err => alert("Erreur : " + err.error)
      });
  }
}
