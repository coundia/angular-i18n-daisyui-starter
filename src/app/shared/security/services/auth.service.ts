import { Injectable, signal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../models/register-request.model';
import { RegisterResponse } from '../models/register-response.model';
import {API_BASE} from '../../constantes/shared-imports';

const API_BASE_AUTH = `${API_BASE}/auth`;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _token = signal<string | null>(localStorage.getItem('token'));

  private _user = signal<RegisterResponse | null>(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null
  );

  get token(): Signal<string | null> {
    return this._token;
  }

  get user(): Signal<RegisterResponse | null> {
    return this._user;
  }

  get isLogged(): boolean {
    return !!this._token();
  }

  constructor(private http: HttpClient) {}

  register(request: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${API_BASE_AUTH}/register`, request);
  }

  login(username: string, password: string): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${API_BASE_AUTH}/login`, { username, password });
  }

  setToken(token: string): void {
    this._token.set(token);
    localStorage.setItem('token', token);
  }

  setUser(user: RegisterResponse): void {
    this._user.set(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout(): void {
    this._token.set(null);
    this._user.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  forgotPassword(username: string): Observable<string> {
    return this.http.post(`${API_BASE_AUTH}/forgot-password`, { username }, { responseType: 'text' });
  }

  resetPassword(token: string, newPassword: string): Observable<string> {
    return this.http.post(`${API_BASE_AUTH}/reset-password`, { token, newPassword }, { responseType: 'text' });
  }
}
