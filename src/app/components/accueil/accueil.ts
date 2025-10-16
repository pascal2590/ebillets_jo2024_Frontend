import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  // <-- à ajouter

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, RouterModule],       // <-- ajouter RouterModule pour que le clic sur le bouton fonctionne
  templateUrl: './accueil.html',
  styleUrls: ['./accueil.css']
})
export class Accueil {
  epreuves = [
    {
      nom: 'Athlétisme',
      description: 'Les épreuves reines des Jeux : vitesse, saut, lancer et endurance.',
      image: 'assets/images/athletisme.jpg'
    },
    {
      nom: 'Natation',
      description: 'Des courses spectaculaires dans le bassin olympique de Paris La Défense Arena.',
      image: 'assets/images/natation.jpg'
    },
    {
      nom: 'Cyclisme sur route',
      description: 'Les routes mythiques de Paris accueillent les meilleurs cyclistes du monde.',
      image: 'assets/images/cyclisme.jpg'
    }
  ];
}
