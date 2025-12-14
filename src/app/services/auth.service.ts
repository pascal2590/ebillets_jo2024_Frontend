import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _user = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user') || 'null'));
    user$ = this._user.asObservable();

    constructor(private http: HttpClient) { }

    login(email: string, password: string): Observable<any> {
        const headers = { 'Content-Type': 'application/json' };
        return this.http.post<any>(`${environment.apiUrl}/Auth/login`, { email, password }, { headers });
    }

    register(userData: any): Observable<any> {
        const headers = { 'Content-Type': 'application/json' };
        return this.http.post<any>(`${environment.apiUrl}/Auth/register`, userData, { headers });
    }

    loginUser(user: any) {
        localStorage.setItem('user', JSON.stringify(user));
        this._user.next(user);
    }

    setUser(user: any) {
        this.loginUser(user);
    }

    logout() {
        localStorage.removeItem('user');
        this._user.next(null);
    }

    getUser() {
        return this._user.value;
    }
}
