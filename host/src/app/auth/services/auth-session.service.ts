import { Injectable, signal } from '@angular/core';

const AUTH_STORAGE_KEY = 'host.isAuthenticated';

@Injectable({ providedIn: 'root' })
export class AuthSessionService {
  private readonly authenticated = signal<boolean>(this.getInitialState());

  readonly isAuthenticated = this.authenticated.asReadonly();

  signIn() {
    this.authenticated.set(true);
    localStorage.setItem(AUTH_STORAGE_KEY, 'true');
  }

  signOut() {
    this.authenticated.set(false);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  private getInitialState(): boolean {
    return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  }
}
