import { Routes } from '@angular/router';
import { Accueil } from './components/accueil/accueil';
import { Offres } from './components/offres/offres';

export const routes: Routes = [
    { path: '', component: Accueil },
    { path: 'offres', component: Offres },
    { path: '**', redirectTo: '' }
];

