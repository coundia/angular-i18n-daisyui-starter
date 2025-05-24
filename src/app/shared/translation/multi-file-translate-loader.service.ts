import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class MultiFileTranslateLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    private baseTranslationPath: string, // Ex: 'assets/i18n/'
    private fileNames: string[] // Ex: ['common.json', 'header.json']
  ) {}

  getTranslation(lang: string): Observable<any> {
    const requests: Observable<any>[] = this.fileNames.map(fileName => {
      const filePath = `${this.baseTranslationPath}${lang}/${fileName}`;
      return this.http.get(filePath);
    });

    return forkJoin(requests).pipe(
      map(responses => {
        return Object.assign({}, ...responses);
      })
    );
  }
}
