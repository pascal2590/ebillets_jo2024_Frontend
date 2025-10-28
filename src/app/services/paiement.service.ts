import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PaiementService {
    private apiUrl = 'https://localhost:5001/api/Paiement'; // ⚠️ adapte l’URL selon ton API
    private reservationUrl = 'http://localhost:5000/api/Reservation'; // pour récupérer la réservation

    constructor(private http: HttpClient) { }

    // 🔹 Récupérer une réservation par son ID
    getReservation(idReservation: number): Observable<any> {
        return this.http.get(`${this.reservationUrl}/${idReservation}`);
    }

    // 🔹 Simuler le paiement d’une réservation
    payerReservation(idReservation: number): Observable<any> {
        return this.http.post(`${this.apiUrl}/${idReservation}`, {});
    }
}
