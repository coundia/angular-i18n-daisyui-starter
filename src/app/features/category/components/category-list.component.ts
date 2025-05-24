import { Component, inject } from '@angular/core';
import {CategoryService} from '../services/category.service';
import {Category} from '../models/category.model';
import {RouterLink} from '@angular/router';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent {
  readonly service = inject(CategoryService);
  readonly list = this.service.categories;

  ngOnInit() {
    this.service.fetchAll();
  }

  delete(category: Category) {
    this.service.delete(category.id).subscribe(() => this.service.fetchAll());
  }

  refresh() {
    this.service.fetchAll();
  }

}
