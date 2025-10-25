import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mes-billets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mes-billets.html',
  styleUrls: ['./mes-billets.css']
})
export class MesBillets implements OnInit {
  billets: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (!userData) {
      this.router.navigate(['/connexion']);
      return;
    }

    const user = JSON.parse(userData);
    this.chargerBillets(user.idUtilisateur);
  }

  chargerBillets(idUtilisateur: number): void {
    this.loading = true;
    this.http.get<any[]>(`https://localhost:5001/api/Billet/utilisateur/${idUtilisateur}`).subscribe({
      next: (res) => {
        this.billets = res.sort(
          (a, b) => new Date(b.dateEmission).getTime() - new Date(a.dateEmission).getTime()
        );
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = "Impossible de récupérer vos billets.";
        this.loading = false;
      }
    });
  }
}
