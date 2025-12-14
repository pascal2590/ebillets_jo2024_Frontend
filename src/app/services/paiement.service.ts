import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PaiementService {
    private apiUrl = `${environment.apiUrl}/Paiement`; // ⚠️ adapter l’URL selon l'API
    private reservationUrl = `${environment.apiUrl}/Reservation`; // pour récupérer la réservation

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
