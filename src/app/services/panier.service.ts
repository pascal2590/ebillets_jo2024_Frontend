import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

// Interface pour les offres dans le panier
export interface PanierOffre {
    idOffre: number;
    nomOffre: string;
    prix: number;
    quantite: number;
}

@Injectable({
    providedIn: 'root'
})
export class PanierService {
    private panierKey = 'panier';
    private apiPanierUrl = `${environment.apiUrl}/Panier`;
    private apiReservationUrl = `${environment.apiUrl}/Reservation`;

    constructor(private http: HttpClient) { }

    /** Récupère le panier localement (LocalStorage) */
    getPanier(): PanierOffre[] {
        const data = localStorage.getItem(this.panierKey);
        return data ? JSON.parse(data) : [];
    }

    /** Récupère le panier depuis l’API */
    getPanierFromApi(idUtilisateur: number): Observable<PanierOffre[]> {
        return this.http.get<PanierOffre[]>(
            `${this.apiPanierUrl}/utilisateur/${idUtilisateur}`
        );
    }

    /** Ajoute une offre dans la BDD */
    ajouterAuPanier(idUtilisateur: number, idOffre: number, quantite: number = 1): Observable<any> {
        const body = { idUtilisateur, idOffre, quantite };
        return this.http.post(`${this.apiPanierUrl}/ajouter`, body);
    }

    /** Supprime une offre côté serveur */
    supprimerServeur(idUtilisateur: number, idOffre: number): Observable<any> {
        return this.http.delete(`${this.apiPanierUrl}/utilisateur/${idUtilisateur}/offre/${idOffre}`);
    }

    /** Vide le panier côté serveur */
    viderServeur(idUtilisateur: number): Observable<any> {
        return this.http.delete(`${this.apiPanierUrl}/utilisateur/${idUtilisateur}/vider`);
    }

    /** Vide le panier local */
    vider(): void {
        localStorage.removeItem(this.panierKey);
    }

    /** Ajoute localement pour affichage rapide côté front */
    ajouterLocal(offre: PanierOffre): void {
        const panier = this.getPanier();
        const existant = panier.find(o => o.idOffre === offre.idOffre);
        if (!existant) {
            panier.push(offre);
            localStorage.setItem(this.panierKey, JSON.stringify(panier));
        }
    }

    /** Supprime localement */
    supprimer(idOffre: number): void {
        const panier = this.getPanier().filter(o => o.idOffre !== idOffre);
        localStorage.setItem(this.panierKey, JSON.stringify(panier));
    }

    /** Compte le nombre d’éléments dans le panier local */
    count(): number {
        return this.getPanier().length;
    }

    /** Crée les réservations côté serveur */
    commander(idUtilisateur: number): Observable<any> {
        const panier = this.getPanier().map(o => ({
            idOffre: o.idOffre,
            quantite: o.quantite ?? 1
        }));
        return this.http.post(`${this.apiReservationUrl}/commander`, { idUtilisateur, panier });
    }
}
