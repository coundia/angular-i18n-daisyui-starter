import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../models/category.model';
import {AuthService} from '../../../shared/security/services/auth.service';
import {API_BASE} from '../../../shared/constantes/shared-imports';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private readonly base = API_BASE+'/v1';

  readonly categories = signal<Category[]>([]);

  private headers(): HttpHeaders {
    const token = this.auth.token();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  fetchAll() {
    this.http.get<{ content: Category[] }>(
      `${this.base}/queries/categorys?page=0&limit=10`,
      { headers: this.headers() }
    ).subscribe(res => this.categories.set(res.content));
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
