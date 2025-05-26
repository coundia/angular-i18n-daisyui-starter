import { HttpClient } from '@angular/common/http';
import { MultiTranslateHttpLoader } from './MultiTranslateHttpLoader';

//todo get from API
const TRANSLATION_FILES = [
   'account',
  'transaction',
  'accountUser',
  'chat',
  'category',
  'setting',
  //core
  'general',
  'nav',
  'notification',
  'security',
  'errors',
  'login',
  'register',
  'reset-password',
  'forgot-password',
  'dashboard',
  'theme'
];

export function httpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, TRANSLATION_FILES);
}
