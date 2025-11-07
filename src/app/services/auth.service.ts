import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _user = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user') || 'null'));
    user$ = this._user.asObservable();

    constructor(private http: HttpClient) { }

    login(user: any) {
        localStorage.setItem('user', JSON.stringify(user));
        this._user.next(user);
    }

    logout() {
        localStorage.removeItem('user');
        this._user.next(null);
    }

    getUser() {
        return this._user.value;
    }

    // -------------------------------
    // Créer un compte
    // -------------------------------
    register(userData: any): Observable<any> {
        const LOCAL_IP = '192.168.1.196'; // ← IP de ton PC
        const serverUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
            ? 'http://localhost'
            : `http://${LOCAL_IP}`;

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post(`${serverUrl}/ebillets_jo2024/register.php`, userData, { headers });
    }



}
