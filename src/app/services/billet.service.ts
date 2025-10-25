import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Billet {
    idBillet: number;
    idReservation: number;
    idOffre: number;
    cleBillet: string;
    cleFinale: string;
    qrCode: string;
    statut: string;
    titulaireNom: string;
    dateEmission: string;
}

@Injectable({
    providedIn: 'root'
})
export class BilletService {

    private apiUrl = 'https://192.168.1.196:5000/api/Billet'; // 🔗 à adapter selon le port backend

    constructor(private http: HttpClient) { }

    /** Récupère tous les billets (pour admin ou test) */
    getAllBillets(): Observable<Billet[]> {
        return this.http.get<Billet[]>(this.apiUrl);
    }

    /** Récupère les billets d’un utilisateur */
    getBilletsByUser(userId: number): Observable<Billet[]> {
        return this.http.get<Billet[]>(`${this.apiUrl}?userId=${userId}`);
    }

    /** Simule l’achat et crée un billet */
    createBillet(billet: Partial<Billet>): Observable<Billet> {
        return this.http.post<Billet>(this.apiUrl, billet);
    }

    /** Supprime un billet */
    deleteBillet(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
