import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PanierService {
    private panierKey = 'panier';
    private apiPanierUrl = `${environment.apiUrl}/Panier`; // ✅ nouvelle URL
    private apiReservationUrl = `${environment.apiUrl}/Reservation`;

    constructor(private http: HttpClient) { }

    getPanier(): any[] {
        const data = localStorage.getItem(this.panierKey);
        return data ? JSON.parse(data) : [];
    }

    /** ✅ Récupère le panier depuis l'API */
    getPanierFromApi(idUtilisateur: number): Observable<any> {
        return this.http.get(`${this.apiPanierUrl}/utilisateur/${idUtilisateur}`)
    }

    /** ✅ Ajoute une offre dans la BDD (table Panier) */
    ajouterAuPanier(idUtilisateur: number, idOffre: number, quantite: number = 1): Observable<any> {
        const body = { idUtilisateur, idOffre, quantite };
        return this.http.post(`${this.apiPanierUrl}/ajouter`, body);
    }    

    /** ✅ LocalStorage (affichage rapide côté front) */
    ajouterLocal(offre: any): void {
        const panier = this.getPanier();
        const existant = panier.find(o => o.idOffre === offre.idOffre);
        if (!existant) {
            panier.push(offre);
            localStorage.setItem(this.panierKey, JSON.stringify(panier));
        }
    }

    supprimerOffre(idUtilisateur: number, idOffre: number) {
        return this.http.delete(`${this.apiPanierUrl}/utilisateur/${idUtilisateur}/offre/${idOffre}`);
    }


    supprimer(idOffre: number): void {
        const panier = this.getPanier().filter(o => o.idOffre !== idOffre);
        localStorage.setItem(this.panierKey, JSON.stringify(panier));
    }

    supprimerServeur(idUtilisateur: number, idOffre: number): Observable<any> {
        return this.http.delete(`${this.apiPanierUrl}/supprimer/${idUtilisateur}/${idOffre}`);
    }

    vider(): void {
        localStorage.removeItem(this.panierKey);
    }

    count(): number {
        return this.getPanier().length;
    }

    /** ✅ Crée les réservations */
    commander(idUtilisateur: number): Observable<any> {
        const panier = this.getPanier().map(o => ({
            idOffre: o.idOffre,
            quantite: 1
        }));

        const body = { idUtilisateur, panier };
        return this.http.post(`${this.apiReservationUrl}/commander`, body);
    }

    viderServeur(idUtilisateur: number): Observable<any> {
        return this.http.delete(`${this.apiPanierUrl}/utilisateur/${idUtilisateur}/vider`);
    }
}
