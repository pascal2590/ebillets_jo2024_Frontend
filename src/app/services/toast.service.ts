import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private container: HTMLElement | null = null;

    constructor() {
        this.createToastContainer();
    }

    private createToastContainer() {
        if (this.container) return;

        this.container = document.createElement('div');
        this.container.className = 'toast-container position-fixed top-0 end-0 p-3';
        this.container.style.zIndex = '1080';
        document.body.appendChild(this.container);
    }

    show(message: string, type: 'success' | 'error' | 'info' = 'info') {
        if (!this.container) this.createToastContainer();

        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-white border-0 show bg-${this.getColor(type)} shadow`;
        toast.role = 'alert';
        toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;

        this.container!.appendChild(toast);

        setTimeout(() => toast.remove(), 4000);
    }

    private getColor(type: string): string {
        switch (type) {
            case 'success': return 'success';
            case 'error': return 'danger';
            case 'info': return 'primary';
            default: return 'secondary';
        }
    }
}
