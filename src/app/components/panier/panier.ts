import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { PanierService } from '../../services/panier.service';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './panier.html',
  styleUrls: ['./panier.css']
})
export class Panier {
  panier: any[] = [];

  constructor(private panierService: PanierService, private router: Router) { }

  ngOnInit(): void {
    this.panier = this.panierService.getPanier();
  }

  supprimer(id: number): void {
    this.panierService.supprimer(id);
    this.panier = this.panierService.getPanier();
  }

  vider(): void {
    this.panierService.vider();
    this.panier = [];
  }
}
