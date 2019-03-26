import { Injectable } from '@angular/core';

export interface IadModuleConfigInterface {
  i18nEnabled?: boolean;
  defaultI18nLang?: string;
  noi18nMessage?: string;
  pageSize?: number;
  rootUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class IadModuleConfig {
  i18nEnabled = false;
  defaultI18nLang = 'en';
  noi18nMessage = 'translation-not-found';
  pageSize = 20;
  rootUrl = '';
}
