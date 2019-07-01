import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToolbarModule, IadBaseGridModule } from 'iad-interface-admin';
import { IadSharedModule, IadModuleConfigInterface, IadModuleConfig, IadConfigService } from 'iad-interface-admin/core';
import { FilterBuilderService, FILTER_BUILDER } from 'iad-interface-admin/filter';

import { ProjectionTableComponent } from './projection-table.component';

export interface ProjectionTableConfigInterface extends IadModuleConfigInterface {
    filterBuilderProvider?: Provider;
}

@NgModule({
    imports: [IadSharedModule, IadBaseGridModule, ToolbarModule],
    declarations: [ProjectionTableComponent],
    exports: [ProjectionTableComponent, IadBaseGridModule]
})
export class ProjectionTableModule {
    static forRoot(moduleConfig: ProjectionTableConfigInterface): ModuleWithProviders {
        return {
            ngModule: ProjectionTableModule,
            providers: [
                { provide: IadModuleConfig, useValue: moduleConfig },
                {
                    provide: IadConfigService,
                    useClass: IadConfigService,
                    deps: [IadModuleConfig]
                },
                moduleConfig.filterBuilderProvider || { provide: FILTER_BUILDER, useClass: FilterBuilderService }
            ]
        };
    }
    static forChild(moduleConfig: ProjectionTableConfigInterface): ModuleWithProviders {
        return {
            ngModule: ProjectionTableModule,
            providers: [
                { provide: IadModuleConfig, useValue: moduleConfig },
                {
                    provide: IadConfigService,
                    useClass: IadConfigService,
                    deps: [IadModuleConfig]
                },
                moduleConfig.filterBuilderProvider || { provide: FILTER_BUILDER, useClass: FilterBuilderService }
            ]
        };
    }

    constructor(translate: TranslateService, config: IadConfigService) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang(config.getConfig().defaultI18nLang);

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use(config.getConfig().defaultI18nLang);
    }
}
