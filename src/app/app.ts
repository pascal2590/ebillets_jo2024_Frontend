import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  user: any = null;
  isAdmin: boolean = false; // ✅ Nouveau

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    // S'abonner aux changements du user
    this.authService.user$.subscribe(user => {
      this.user = user;
      this.isAdmin = user && user.role === 2; // ✅ Vérifie le rôle
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/accueil']);
  }
}
