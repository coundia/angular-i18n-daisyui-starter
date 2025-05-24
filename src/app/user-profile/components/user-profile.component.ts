import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import {UserAvatarComponent} from './user-avatar.component';
import {UserStatusComponent} from './user-status.component';
import {UserProfileService} from '../services/service.service';
import {Observable} from 'rxjs';
import {UserProfile} from '../models/user.model';


@Component({
  standalone: true,
  selector: 'app-user-profile',
  imports: [CommonModule, AsyncPipe, UserAvatarComponent, UserStatusComponent],
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent {
  private service = inject(UserProfileService);
  protected readonly user$: Observable<UserProfile> = this.service.getProfile();
}
