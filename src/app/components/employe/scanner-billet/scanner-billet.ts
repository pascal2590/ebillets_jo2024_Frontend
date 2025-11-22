import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-scanner-billet',
  standalone: true,
  imports: [CommonModule, FormsModule, ZXingScannerModule],
  templateUrl: './scanner-billet.html',
  styleUrls: ['./scanner-billet.css']
})
export class ScannerBilletComponent {
  qrCodeResult = '';
  message = '';
  errorMessage = '';

  hasPermission = false;
  scannerStarted = false;

  currentDevice: MediaDeviceInfo | undefined;
  availableDevices: MediaDeviceInfo[] = [];

  constructor(private http: HttpClient) { }

  // ---------------------------
  // 📌 CAMÉRAS DÉTECTÉES
  // ---------------------------
  onCamerasFound(devices: MediaDeviceInfo[]) {
    console.log("Caméras détectées :", devices);
    this.availableDevices = devices;

    // Sélection automatique de la caméra contenant "WBE"
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
    this.message = "Billet scanné !";

    this.http.post(`http://localhost:5000/api/ScanBillet/${result}?idEmploye=1`, {})
      .subscribe({
        next: () => this.message = 'Billet validé !',
        error: (err) => this.message = 'Erreur : ' + (err.error?.message || err.message)
      });
  }

  // ---------------------------
  // 📌 DÉMARRER
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
  // 📌 ARRÊTER
  // ---------------------------
  stopScanner() {
    this.scannerStarted = false;
    this.message = '';
    this.qrCodeResult = '';
    console.log("Caméra arrêtée.");
  }

  // ---------------------------
  // 📌 RÉESSAYER
  // ---------------------------
  retryCamera() {
    console.log("Tentative de reconnexion caméra...");
    this.startScanner();
  }
}
