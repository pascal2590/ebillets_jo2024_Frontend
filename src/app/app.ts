import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  user: any = null;

  constructor(private router: Router) { }

  ngOnInit() {
    this.checkUser();
  }

  checkUser() {
    const storedUser = localStorage.getItem('user');
    this.user = storedUser ? JSON.parse(storedUser) : null;
  }

  logout() {
    localStorage.removeItem('user');
    this.user = null;
    this.router.navigate(['/connexion']);
  }
}
