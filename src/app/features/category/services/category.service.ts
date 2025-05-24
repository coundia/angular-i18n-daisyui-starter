import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Category} from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly http = inject(HttpClient);
  private readonly base = 'http://127.0.0.1:8095/api/v1';

  readonly categories = signal<Category[]>([]);

  fetchAll() {
    this.http.get<{ content: Category[] }>(`${this.base}/queries/categorys?page=0&limit=10`)
      .subscribe(res => this.categories.set(res.content));
  }

  create(dto: Partial<Category>) {
    return this.http.post(`${this.base}/commands/category`, dto);
  }

  update(id: string, dto: Partial<Category>) {
    return this.http.put(`${this.base}/commands/category/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete(`${this.base}/commands/category/${id}`);
  }
}
