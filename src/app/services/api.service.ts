import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl = 'http://192.168.1.196:5000/api'; // private baseUrl = 'https://localhost:5001/api'

    constructor(private http: HttpClient) { }

    getOffres(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/Offre`);
    }

    getOffreById(id: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/Offre/${id}`);
    }
}