import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-user-avatar',
  imports: [CommonModule],
  templateUrl: './user-avatar.component.html'
})
export class UserAvatarComponent {
  @Input() username = '';
}
