import { ModuleWithProviders, NgModule, Provider } from '@angular/core';

import { IadSharedModule, IadModuleConfigInterface, IadModuleConfig, IadConfigService } from 'iad-interface-admin/core';
import { IadRouterHistoryService } from './public-services/iad-router-history.service';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { IadProjectionFormComponent } from './iad-projection-form.component';
import { TranslateService } from '@ngx-translate/core';
import { IadReferenceProjectionProviderService } from './public-services/iad-reference-projection-provider.service';

export interface ProjectionFormConfigInterface extends IadModuleConfigInterface {
    referenceProjectionProvider?: Provider;
}

@NgModule({
    imports: [
        DynamicFormModule,
        IadSharedModule
    ],
    declarations: [IadProjectionFormComponent],
    exports: [IadProjectionFormComponent]
})
export class IadProjectionFormModule {
    static forRoot(moduleConfig: ProjectionFormConfigInterface): ModuleWithProviders {
        return {
            ngModule: DynamicFormModule,
            providers: [
                { provide: IadModuleConfig, useValue: moduleConfig },
                {
                    provide: IadConfigService,
                    useClass: IadConfigService,
                    deps: [IadModuleConfig]
                },
                moduleConfig.referenceProjectionProvider || { provide: IadReferenceProjectionProviderService, useClass: IadReferenceProjectionProviderService }
            ]
        };
    }
    static forChild(moduleConfig: ProjectionFormConfigInterface): ModuleWithProviders {
        return {
            ngModule: DynamicFormModule,
            providers: [
                { provide: IadModuleConfig, useValue: moduleConfig },
                {
                    provide: IadConfigService,
                    useClass: IadConfigService,
                    deps: [IadModuleConfig]
                },
                moduleConfig.referenceProjectionProvider || { provide: IadReferenceProjectionProviderService, useClass: IadReferenceProjectionProviderService }
            ]
        };
    }

    constructor(translate: TranslateService, config: IadConfigService, iadRouterHistoryService: IadRouterHistoryService) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang(config.getConfig().defaultI18nLang);

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use(config.getConfig().defaultI18nLang);
    }
}
