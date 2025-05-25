import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-entity-toolbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './entity-toolbar.component.html',
})
export class EntityToolbarComponent {
  @Input() createLink = '/';
  @Input() createLabel = 'Créer';
  @Output() refresh = new EventEmitter<void>();
}
