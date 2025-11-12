import { RouterModule, Routes } from '@angular/router';
import { Accueil } from './components/accueil/accueil';
import { Offres } from './components/offres/offres';
import { Connexion } from './components/connexion/connexion';
import { Inscription } from './components/inscription/inscription';
import { PanierComponent } from './components/panier/panier';
import { Paiement } from './components/paiement/paiement';
import { MesBillets } from './components/mes-billets/mes-billets';
import { Reservation } from './components/reservation/reservation';
import { authGuard } from './services/auth.guard';

// ✅ Nouveau composant Admin
import { AdminOffresComponent } from './components/admin-offres/admin-offres';

// ✅ (optionnel) futur garde d’administration
// import { adminGuard } from './services/admin.guard';

export const routes: Routes = [
    // ✅ Routes publiques
    { path: '', component: Accueil },
    { path: 'offres', component: Offres },
    { path: 'connexion', component: Connexion },
    { path: 'inscription', component: Inscription },

    // ✅ Routes protégées pour utilisateurs connectés
    { path: 'panier', component: PanierComponent, canActivate: [authGuard] },
    { path: 'paiement/:idReservation', component: Paiement, canActivate: [authGuard] },
    { path: 'mes-billets', component: MesBillets, canActivate: [authGuard] },
    { path: 'reservation', component: Reservation, canActivate: [authGuard] },

    // ✅ Route pour l’administrateur
    // Prévoir de remplacer `authGuard` par `adminGuard`
    { path: 'admin/offres', component: AdminOffresComponent, canActivate: [authGuard] },

    // ✅ Redirection par défaut
    { path: '**', redirectTo: '' }
];
