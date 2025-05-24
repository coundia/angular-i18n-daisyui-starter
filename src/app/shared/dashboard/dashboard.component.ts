import { Component } from '@angular/core';
import {SHARED_IMPORTS} from '../constantes/shared-imports';

@Component({
  selector: 'app-dashboard',
  imports: [SHARED_IMPORTS],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  stats = [
    { title: 'Users', value: 1243, icon: '👥', color: 'text-info' },
    { title: 'Sales', value: '$32,000', icon: '💰', color: 'text-success' },
    { title: 'Visits', value: '8,943', icon: '📈', color: 'text-warning' },
    { title: 'Errors', value: 12, icon: '❌', color: 'text-error' },
  ];

  logs = [
    { time: '10:45', message: 'New user registered' },
    { time: '11:10', message: 'Payment received' },
    { time: '12:05', message: 'API error resolved' },
    { time: '13:20', message: 'User feedback submitted' },
  ];
}
