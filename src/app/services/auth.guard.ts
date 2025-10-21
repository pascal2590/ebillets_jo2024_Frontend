import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const user = localStorage.getItem('user');

    if (user) {
        // ✅ L'utilisateur est connecté
        return true;
    } else {
        // ❌ Non connecté → redirection vers la page de connexion
        router.navigate(['/connexion'], {
            queryParams: { redirect: state.url }
        });
        return false;
    }
};
