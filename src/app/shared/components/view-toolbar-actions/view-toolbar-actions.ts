import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-toolbar-actions',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: 'view-toolbar-actions.html',
})
export class EntityToolbarActionComponent {
  @Input() backLink?: string;
  @Input() editLink?: string;
  @Input() newLink?: string;
  @Input() showDelete = false;
  @Input() editMode = false;
  @Input() backLabel?: string;
  @Input() editLabel?: string;
  @Input() deleteLabel?: string;
  @Input() newLabel?: string;

  @Output() delete = new EventEmitter<void>();
}
