import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-user-status',
  imports: [CommonModule],
  templateUrl: './user-status.component.html'
})
export class UserStatusComponent {
  @Input() label = '';
  @Input() status = false;
  @Input() badgeTrue = 'badge-success';
  @Input() badgeFalse = 'badge-error';
}
