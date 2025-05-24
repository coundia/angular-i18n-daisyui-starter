import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

const translationFiles = [
  'common.json',
  'header.json',
  'messages.json'
];

@Injectable({
  providedIn: 'root'
})
export class LanguageInitializerService {

  constructor(private translate: TranslateService, private http: HttpClient) {}

  async initializeLanguage(): Promise<void> {
    this.translate.addLangs(['fr']);
    this.translate.setDefaultLang('fr');

    const browserLang = this.translate.getBrowserLang();
    const initialLang = browserLang?.match(/fr/) ? browserLang : 'fr';
    // const initialLang = browserLang?.match(/fr|en/) ? browserLang : 'fr';

    await this.translate.use(initialLang).toPromise();
    console.log(`Langue initiale chargée : ${this.translate.currentLang}`);
  }
}
