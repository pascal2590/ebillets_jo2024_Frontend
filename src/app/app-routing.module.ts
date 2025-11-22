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

// Composants pour les employés
import { ScannerBilletComponent } from './components/employe/scanner-billet/scanner-billet';


// Composants Admin Offres
import { AjouterOffreComponent } from './components/admin/offres/ajouter-offre/ajouter-offre';
import { ModifierOffreComponent } from './components/admin/offres/modifier-offre/modifier-offre';

// ✅ Nouveau composant Admin
import { AdminOffresComponent } from './components/admin/ventes/admin-offres';
import { AjouterEmployeComponent } from './components/admin/ajouter-employe/ajouter-employe';


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
    { path: 'employe/scanner', component: ScannerBilletComponent, canActivate: [authGuard] },


    // ✅ Route pour l’administrateur
    // Prévoir de remplacer `authGuard` par `adminGuard`
    //{ path: 'admin/offres', component: AdminOffresComponent, canActivate: [authGuard] },
    { path: 'admin/employes/ajouter', component: Inscription, data: { role: 'Employe' } },
    { path: 'admin/offres/ajouter', component: AjouterOffreComponent, canActivate: [authGuard] },
    { path: 'admin/offres/modifier', component: ModifierOffreComponent, canActivate: [authGuard] },
    { path: 'admin/employes/ajouter', component: AjouterEmployeComponent, canActivate: [authGuard] },
    { path: 'admin/offres', component: AdminOffresComponent, canActivate: [authGuard] },
    {
        path: 'admin/offres',
        children: [
            { path: '', redirectTo: 'visualiser', pathMatch: 'full' },
            
            { path: 'ajouter', component: AjouterOffreComponent },
            { path: 'modifier/:id', component: ModifierOffreComponent },
            //{ path: 'creer', component: CreerOffreComponent },
        ]
    },

    // ✅ Redirection par défaut
    { path: '**', redirectTo: '' }
];
