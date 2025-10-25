import { RouterModule, Routes } from '@angular/router';
import { Accueil } from './components/accueil/accueil';
import { Offres } from './components/offres/offres';
import { Connexion } from './components/connexion/connexion';
import { Inscription } from './components/inscription/inscription';
import { Panier } from './components/panier/panier';
import { authGuard } from './services/auth.guard';
import { Paiement } from './components/paiement/paiement';
import { MesBillets } from './components/mes-billets/mes-billets';
import { Reservation } from './components/reservation/reservation';


// Définition des routes protégées de l'application : seul un utilisateur authentifié peut accéder aux pages Panier et Paiement
// ✅ Routes principales
export const routes: Routes = [
    { path: '', component: Accueil },
    { path: 'offres', component: Offres },
    { path: 'connexion', component: Connexion },
    { path: 'inscription', component: Inscription },

    // ✅ Routes protégées
    { path: 'panier', component: Panier, canActivate: [authGuard] },
    { path: 'paiement', component: Paiement, canActivate: [authGuard] },
    { path: 'mes-billets', component: MesBillets, canActivate: [authGuard] },
    { path: 'reservation', component: Reservation, canActivate: [authGuard] },


    // ✅ Redirection par défaut
    { path: '**', redirectTo: '' }
];