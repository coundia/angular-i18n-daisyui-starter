import {Component, inject, OnInit, signal, ViewChild} from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { RouterLink } from '@angular/router';
import {NgClass, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CategoryDrawerComponent} from './category-drawer.component';
import {ToastComponent} from '../../../shared/components/toast/toast.component';
import {ToastService} from '../../../shared/components/toast/toast.service';
import {AlertService} from '../../../shared/components/alert/alert.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterLink, NgClass, FormsModule, NgIf, CategoryDrawerComponent],
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent implements OnInit {
  readonly service = inject(CategoryService);
  readonly toast = inject(ToastService);
  readonly alert = inject(AlertService);
  readonly list = this.service.categories;
  readonly totalPages = this.service.totalPages;

  readonly page = signal(0);
  readonly size = signal(10);
  @ViewChild(ToastComponent) toastRef!: ToastComponent;

  searchField = 'name';
  searchTerm = '';

  search() {
    const field = this.searchField;
    const value = this.searchTerm.trim();

    if (!value) return this.refresh();

    this.service.search(field, value);
  }


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

  async delete(category: Category) {
    const confirmed = window.confirm(`Supprimer "${category.name}" ?`);
    if (!confirmed) return;

    console.log(`[delete] Demande de suppression pour :`, category);

    try {
      await this.service.delete(category.id).toPromise();

      console.log(`[delete] Suppression envoyée au backend pour id=${category.id}`);
      this.toast.show(`Suppression en cours de "${category.name}"...`, 'info');
      this.alert.show(`La demande de suppression a été envoyée.`, 'info');

      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log(`[delete] Rafraîchissement de la liste après délai`);
      this.refresh();
    } catch (e) {
      console.error(`[delete] Échec suppression`, e);
      this.toast.show(`Erreur lors de la suppression`, 'error');
      this.alert.show(`Impossible de supprimer "${category.name}".`, 'error');
    }
  }




  clearSearch() {
    this.searchTerm = '';
    this.refresh();
  }


  readonly selectedCategory = signal<Category | null>(null);

  showDetails(id: string) {
    const item = this.list().find(c => c.id === id);
    if (!item) return;

    // force la fermeture avant réouverture (résout le bug)
    this.selectedCategory.set(null);

    // attente courte pour que *ngIf détecte bien le changement
    setTimeout(() => {
      this.selectedCategory.set(item);
    }, 0);
  }


}
