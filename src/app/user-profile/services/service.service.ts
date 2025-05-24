import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {AuthService} from '../../shared/security/services/auth.service';
import {UserProfile} from '../models/user.model';
import {API_BASE} from '../../shared/constantes/shared-imports';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);


  getProfile(): Observable<UserProfile> {
    const token = this.auth.token();
    return this.http
      .get<{ code: number; message: string; data: UserProfile }>(
        `${API_BASE}/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .pipe(map(res => res.data));
  }
}
