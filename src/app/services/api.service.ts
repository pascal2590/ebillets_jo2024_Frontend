import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getOffres(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/Offre`);
    }

    getOffreById(id: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/Offre/${id}`);
    }
}