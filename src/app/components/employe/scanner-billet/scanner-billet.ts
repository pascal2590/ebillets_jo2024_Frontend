import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-scanner-billet',
  standalone: true,
  imports: [CommonModule, FormsModule, ZXingScannerModule],
  templateUrl: './scanner-billet.html',
  styleUrls: ['./scanner-billet.css']
})
export class ScannerBilletComponent {
  qrCodeResult = '';       // Code QR lu
  message = '';            // Message de succès / erreur
  errorMessage = '';       // Erreur d'accès caméra

  hasPermission = false;   // Permission caméra
  scannerStarted = false;  // Scanner démarré ou non

  currentDevice: MediaDeviceInfo | undefined;
  availableDevices: MediaDeviceInfo[] = [];

  // ⚡ Nouvel objet pour stocker les infos du billet scanné
  billetInfo: {
    nomOffre?: string;
    clientNom?: string;
    clientPrenom?: string;
  } = {};

  constructor(private http: HttpClient) { }

  // ---------------------------
  // 📌 CAMÉRAS DÉTECTÉES
  // ---------------------------
  onCamerasFound(devices: MediaDeviceInfo[]) {
    console.log("Caméras détectées :", devices);
    this.availableDevices = devices;

    // Sélection automatique de la caméra contenant "WBE" sinon première caméra
    const wbeCam = devices.find(d => d.label.includes("WBE"));
    this.currentDevice = wbeCam ?? devices[0];

    console.log("Caméra sélectionnée :", this.currentDevice?.label);
  }

  // ---------------------------
  // 📌 PERMISSION CAMÉRA
  // ---------------------------
  onHasPermission(event: any) {
    this.hasPermission = Boolean(event);
    console.log("Permission caméra :", this.hasPermission);
  }

  // ---------------------------
  // 📌 QR CODE SCANNÉ
  // ---------------------------
  onCodeResult(result: string) {
    this.qrCodeResult = result;
    this.message = "Scan en cours...";
    this.billetInfo = {}; // réinitialise les infos du billet

    this.http.post(`${environment.apiUrl}/ScanBillet/${result}`, {})
      .subscribe({
        next: (res: any) => {
          // Message principal (nombre de scans)
          this.message = res.message;

          // Récupère le nom de l'offre et le nom/prénom du client
          this.billetInfo.nomOffre = res.nomOffre;
          this.billetInfo.clientNom = res.clientNom;
          this.billetInfo.clientPrenom = res.clientPrenom;
        },
        error: (err) => {
          if (err.status === 404) {
            this.message = 'Billet invalide.';
          } else if (err.status === 400) {
            this.message = err.error?.message || 'Billet déjà scanné.';
          } else {
            this.message = 'Erreur : ' + (err.error?.message || err.message);
          }
        }
      });
  }

  // ---------------------------
  // 📌 DÉMARRER LE SCANNER
  // ---------------------------
  startScanner() {
    this.scannerStarted = true;
    this.errorMessage = '';

    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => {
        this.hasPermission = true;
        console.log("Caméra démarrée.");
      })
      .catch(err => {
        this.hasPermission = false;
        this.errorMessage = "Accès caméra impossible.";
        console.error(err);
      });
  }

  // ---------------------------
  // 📌 ARRÊTER LE SCANNER
  // ---------------------------
  stopScanner() {
    this.scannerStarted = false;
    this.message = '';
    this.qrCodeResult = '';
    this.billetInfo = {};
    console.log("Caméra arrêtée.");
  }

  // ---------------------------
  // 📌 RÉESSAYER LA CAMÉRA
  // ---------------------------
  retryCamera() {
    console.log("Tentative de reconnexion caméra...");
    this.startScanner();
  }
}
