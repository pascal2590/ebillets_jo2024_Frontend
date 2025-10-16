import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-offres',
  standalone: true,
  imports: [CommonModule, HttpClientModule, CurrencyPipe],
  templateUrl: './offres.html',
  styleUrls: ['./offres.css']
})
export class Offres implements OnInit {
  offres: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://192.168.1.196:5000/api/Offre').subscribe({ // https://localhost:5001/api/Offre - https://192.168.1.196:5001/api/Offre
      next: data => {
        this.offres = data;
        this.loading = false;        
      },
      error: err => {        
        this.error = "Impossible de charger les offres.";
        this.loading = false;        
      }
    });
  }
}
