import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {CategoryService} from '../services/category.service';
import {Category} from '../models/category.model';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe],
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
}
