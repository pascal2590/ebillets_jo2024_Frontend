import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './accueil.html',
  styleUrls: ['./accueil.css']
})
export class Accueil implements OnInit {

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

  user: any = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Charger l'utilisateur depuis localStorage à l'initialisation
    const storedUser = localStorage.getItem('user');
    this.user = storedUser ? JSON.parse(storedUser) : null;
  }

  logout() {
    // Supprimer l'utilisateur et mettre à jour la vue
    localStorage.removeItem('user');
    this.user = null;

    // Redirection vers l'accueil
    this.router.navigate(['/']);
  }
}
