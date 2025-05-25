import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination-controls',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination-controls.component.html',
})
export class PaginationControlsComponent {
  @Input() page = 0;
  @Input() totalPages = 1;

  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
}
