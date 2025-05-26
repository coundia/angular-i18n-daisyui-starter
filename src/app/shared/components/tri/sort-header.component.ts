import { Component, Input } from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {SortService} from './sort.service';

@Component({
  selector: 'app-sort-header',
  standalone: true,
  imports: [NgClass ],
  templateUrl: './sort-header.component.html',
})
export class SortHeaderComponent {
  @Input() field = '';
  @Input() label = '';

  constructor(private readonly sort: SortService) {}

  onToggle() {
    this.sort.toggle(this.field);
  }

  isAsc() {
    return this.sort.isSortedBy(this.field, 'asc');
  }

  isDesc() {
    return this.sort.isSortedBy(this.field, 'desc');
  }
}
