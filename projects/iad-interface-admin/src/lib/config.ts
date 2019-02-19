import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IadModuleConfig {
  constructor(
    public i18nEnabled = false,
    public defaultI18nLang = 'en',
    public noi18nMessage = 'translation-not-found'
  ) {}
}
