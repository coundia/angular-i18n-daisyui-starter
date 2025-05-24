import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {SHARED_IMPORTS} from '../../constantes/shared-imports';

@Component({
  selector: 'app-navbar-guest',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, SHARED_IMPORTS],
  templateUrl: './navbar-guest.component.html',
  styleUrls: ['./navbar-guest.component.css'],
})
export class NavbarGuestComponent {}
