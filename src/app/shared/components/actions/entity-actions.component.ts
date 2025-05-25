import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-entity-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entity-actions.component.html',
})
export class EntityActionsComponent {
  @Input() id!: string;
  @Input() editLink!: string;
  @Input() newLink!: string;

  @Output() view = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();

  triggerView() {
    this.view.emit(this.id);
  }

  triggerDelete() {
    this.remove.emit(this.id);
  }

  triggerEdit() {
    this.edit.emit(this.id);
  }
}
