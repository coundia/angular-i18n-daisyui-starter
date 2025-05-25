import { Component, Input, Output, EventEmitter, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination-join',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination-join.component.html',
})
export class PaginationJoinComponent {
  @Input() page = 0;
  @Input() totalPages = 1;
  @Output() pageChange = new EventEmitter<number>();

  readonly range = 2;

  readonly pages = computed(() => {
    const pages: (number | '...')[] = [];
    const start = Math.max(0, this.page - this.range);
    const end = Math.min(this.totalPages - 1, this.page + this.range);

    if (start > 0) {
      pages.push(0);
      if (start > 1) pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < this.totalPages - 1) {
      if (end < this.totalPages - 2) pages.push('...');
      pages.push(this.totalPages - 1);
    }

    return pages;
  });

  select(index: number | string) {
    if (typeof index === 'number' && index !== this.page) {
      this.pageChange.emit(index);
    }
  }
}
