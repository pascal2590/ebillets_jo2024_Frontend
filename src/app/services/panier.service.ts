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
        // ✅ Correction : utiliser idOffre au lieu de id
        const existant = panier.find(o => o.idOffre === offre.idOffre);

        if (!existant) {
            panier.push(offre);
            localStorage.setItem(this.panierKey, JSON.stringify(panier));
        }
    }

    /** Supprime une offre du panier */
    supprimer(idOffre: number): void {
        // ✅ Correction ici aussi
        const panier = this.getPanier().filter(o => o.idOffre !== idOffre);
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
