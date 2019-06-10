import { Injectable, Provider } from '@angular/core';

export interface IadModuleConfigInterface {
    i18nEnabled?: boolean;
    defaultI18nLang?: string;
    noi18nMessage?: string;
    pageSize?: number;
    rootUrl?: string;
    referenceProjectionProvider?: Provider;
    filterBuilderProvider?: Provider;
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
    referenceProjectionProvider = null;
    filterBuilderProvider = null;
}
