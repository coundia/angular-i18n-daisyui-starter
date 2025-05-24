import {Component, inject, Input, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../models/category.model';
import {Router, RouterLink} from '@angular/router';
import {CategoryService} from '../services/category.service';

@Component({
  selector: 'app-category-drawer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category-drawer.component.html',
})
export class CategoryDrawerComponent {
  @Input({ required: true }) category!: Category;
  visible = signal(true);

  readonly service = inject(CategoryService);
  private readonly router = inject(Router);

  close() {
    this.visible.set(false);
  }

  async confirmDelete(id: string) {

    const confirmed = window.confirm(`Supprimer "${this.category.name}" ?`);
    if (!confirmed) return;

    await new Promise(resolve => setTimeout(resolve, 2000));

    await this.router.navigate(['/category']);
    this.service.fetch(0, 10);
  }
}
