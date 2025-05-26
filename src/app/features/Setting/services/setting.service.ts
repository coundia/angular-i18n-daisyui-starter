import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Setting } from '../models/setting.model';
import { AuthService } from '../../../shared/security/services/auth.service';
import { API_BASE } from '../../../shared/constantes/shared-imports';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SettingService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private readonly base = `${API_BASE}/v1`;

  readonly settings = signal<Setting[]>([]);
  readonly totalPages = signal(0);
  readonly totalElements = signal(0);

  private headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.auth.token()}`,
      'Content-Type': 'application/json',
    });
  }

  fetch(page = 0, limit = 10): Observable<{ content: Setting[]; totalPages: number; totalElements: number }> {
    return this.http
      .get<{ content: Setting[]; totalPages: number; totalElements: number }>(
        `${this.base}/queries/settings?page=${page}&limit=${limit}`,
        { headers: this.headers() }
      )
      .pipe(
        tap(res => {
          this.settings.set(res.content);
          this.totalPages.set(res.totalPages ?? 0);
          this.totalElements.set(res.totalElements ?? 0);
        })
      );
  }

  create(dto: Partial<Setting>): Observable<any> {
    return this.http.post(`${this.base}/commands/setting`, dto, {
      headers: this.headers(),
    });
  }

  update(id: string, dto: Partial<Setting>): Observable<any> {
    return this.http.put(`${this.base}/commands/setting/${id}`, dto, {
      headers: this.headers(),
    });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.base}/commands/setting/${id}`, {
      headers: this.headers(),
    });
  }

  search(field: string, value: string): Observable<Setting[]> {
    const fieldType = this.getFieldType(field);
    let formattedValue = value;

    if (fieldType === 'boolean') {
      formattedValue = value.toLowerCase() === 'true' ? 'true' : 'false';
    }

    if (fieldType === 'date') {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        formattedValue = date.toISOString().split('T')[0] + 'T00:00:00Z';
      }
    }

    return this.http
      .get<Setting[]>(
        `${this.base}/queries/setting/${field}?${field}=${encodeURIComponent(formattedValue)}`,
        { headers: this.headers() }
      )
      .pipe(tap(res => this.settings.set(res)));
  }

  getById(id: string): Observable<Setting> {
    return this.http.get<Setting>(
      `${this.base}/queries/setting/id?id=${encodeURIComponent(id)}`,
      { headers: this.headers() }
    );
  }

  private getFieldType(field: string): 'string' | 'boolean' | 'date' {
    switch (field) {
      case 'updatedAt':
        return 'date';
      default:
        return 'string';
    }
  }
}
