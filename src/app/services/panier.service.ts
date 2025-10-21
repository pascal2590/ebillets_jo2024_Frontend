import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PanierService {
    private panierKey = 'panier';

    constructor() { }

    /** Récupère les articles du panier */
    getPanier(): any[] {
        const data = localStorage.getItem(this.panierKey);
        return data ? JSON.parse(data) : [];
    }

    /** Ajoute une offre au panier */
    ajouter(offre: any): void {
        const panier = this.getPanier();
        const existant = panier.find(o => o.id === offre.id);

        if (!existant) {
            panier.push(offre);
            localStorage.setItem(this.panierKey, JSON.stringify(panier));
        }
    }

    /** Supprime une offre du panier */
    supprimer(id: number): void {
        const panier = this.getPanier().filter(o => o.id !== id);
        localStorage.setItem(this.panierKey, JSON.stringify(panier));
    }

    /** Vide complètement le panier */
    vider(): void {
        localStorage.removeItem(this.panierKey);
    }

    /** Nombre total d’articles */
    count(): number {
        return this.getPanier().length;
    }
}
