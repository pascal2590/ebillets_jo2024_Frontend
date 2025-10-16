import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffresService {

  // Remplace cette URL par celle de ton API
  private apiUrl = 'http://localhost:5000/api/offres';

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer toutes les offres
  getOffres(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
