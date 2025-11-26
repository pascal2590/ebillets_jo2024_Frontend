import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _user = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user') || 'null'));
    user$ = this._user.asObservable();

    constructor(private http: HttpClient) { }

    login(email: string, password: string, serverUrl: string): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(`${serverUrl}/api/Auth/login`, { email, password }, { headers });
    }

    register(userData: any, serverUrl: string): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(`${serverUrl}/api/Auth/register`, userData, { headers });
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
