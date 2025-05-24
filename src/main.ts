import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';


const saved = localStorage.getItem('theme');
if (saved === 'dark' || saved === 'light') {
  console.log(saved);
  document.documentElement.setAttribute('data-theme', saved);
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
