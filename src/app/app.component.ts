import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {SHARED_IMPORTS} from './shared/constantes/shared-imports';
import {TranslateService} from '@ngx-translate/core';
import {BackgroundComponent} from './shared/background/background.component';
import {ToastComponent} from './shared/components/toast/toast.component';
import {AlertComponent} from './shared/components/alert/alert.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SHARED_IMPORTS, RouterOutlet, NavbarComponent, BackgroundComponent, ToastComponent, AlertComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.use('fr');
  }

}
