import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../models/category.model';
import { AuthService } from '../../../shared/security/services/auth.service';
import { API_BASE } from '../../../shared/constantes/shared-imports';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private readonly base = `${API_BASE}/v1`;

  readonly categories = signal<Category[]>([]);
  readonly totalPages = signal(0);
  readonly totalElements = signal(0);

  private headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.auth.token()}`,
      'Content-Type': 'application/json',
    });
  }

  fetch(page = 0, limit = 10): void {
    this.http
      .get<{ content: Category[]; totalPages: number; totalElements: number }>(
        `${this.base}/queries/categorys?page=${page}&limit=${limit}`,
        { headers: this.headers() }
      )
      .subscribe(res => {
        this.categories.set(res.content);
        this.totalPages.set(res.totalPages ?? 0);
        this.totalElements.set(res.totalElements ?? 0);
      });
  }

  create(dto: Partial<Category>) {
    return this.http.post(`${this.base}/commands/category`, dto, {
      headers: this.headers(),
    });
  }

  update(id: string, dto: Partial<Category>) {
    return this.http.put(`${this.base}/commands/category/${id}`, dto, {
      headers: this.headers(),
    });
  }

  delete(id: string) {
    return this.http.delete(`${this.base}/commands/category/${id}`, {
      headers: this.headers(),
    });
  }
}
