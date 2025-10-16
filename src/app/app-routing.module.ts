import { Routes } from '@angular/router';
import { Accueil } from './components/accueil/accueil';
import { Offres } from './components/offres/offres';
import { Connexion } from './components/connexion/connexion';
import { Inscription } from './components/inscription/inscription';

export const routes: Routes = [
    { path: '', component: Accueil },
    { path: 'offres', component: Offres },
    { path: 'connexion', component: Connexion },
    { path: 'inscription', component: Inscription },
    { path: '**', redirectTo: '' }
];

