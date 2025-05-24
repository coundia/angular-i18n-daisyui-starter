import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent implements OnInit {
  readonly service = inject(CategoryService);
  readonly list = this.service.categories;
  readonly totalPages = this.service.totalPages;

  readonly page = signal(0);
  readonly size = signal(10);

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.service.fetch(this.page(), this.size());
  }

  next() {
    if (this.page() < this.totalPages() - 1) {
      this.page.update(p => p + 1);
      this.refresh();
    }
  }

  prev() {
    if (this.page() > 0) {
      this.page.update(p => p - 1);
      this.refresh();
    }
  }

  delete(category: Category) {
    const confirmDelete = window.confirm(`Supprimer la catégorie "${category.name}" ?`);
    if (!confirmDelete) return;

    this.service.delete(category.id).subscribe(() => this.refresh());
  }
}
