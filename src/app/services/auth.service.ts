import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _user = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user') || 'null'));
    user$ = this._user.asObservable();

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
}
