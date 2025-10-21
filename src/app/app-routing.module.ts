import { RouterModule, Routes } from '@angular/router';
import { Accueil } from './components/accueil/accueil';
import { Offres } from './components/offres/offres';
import { Connexion } from './components/connexion/connexion';
import { Inscription } from './components/inscription/inscription';
import { Panier } from './components/panier/panier';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
    { path: '', component: Accueil },
    { path: 'offres', component: Offres },
    { path: 'connexion', component: Connexion },
    { path: 'inscription', component: Inscription },
    { path: 'panier',
         component: Panier, canActivate: [authGuard]
    },
    { path: '**', redirectTo: '' }
];