import { ModuleWithProviders, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface IadModuleConfigInterface {
  i18nEnabled?: boolean;
  defaultI18nLang?: string;
  noi18nMessage?: string;
  pageSize?: number;
  rootUrl?: string;
}

export class IadConfigService {
  CONFIG_OPTIONS: IadModuleConfig;

  constructor(moduleConfig?: IadModuleConfigInterface) {
    this.CONFIG_OPTIONS = {
      ...new IadModuleConfig(),
      ...moduleConfig
    };
  }

  getConfig(): IadModuleConfig {
    return this.CONFIG_OPTIONS;
  }
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

export class IadEnvModule {
  static forRoot(moduleConfig: IadModuleConfigInterface): ModuleWithProviders {
    return {
      ngModule: IadEnvModule,
      providers: [
        { provide: IadModuleConfig, useValue: moduleConfig },
        {
          provide: IadConfigService,
          useClass: IadConfigService,
          deps: [IadModuleConfig]
        }
      ]
    };
  }
  static forChild(moduleConfig: IadModuleConfigInterface): ModuleWithProviders {
    return {
      ngModule: IadEnvModule,
      providers: [{ provide: IadModuleConfig, useValue: moduleConfig }]
    };
  }

  constructor(translate: TranslateService, config: IadConfigService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(config.getConfig().defaultI18nLang);

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(config.getConfig().defaultI18nLang);
  }
}
