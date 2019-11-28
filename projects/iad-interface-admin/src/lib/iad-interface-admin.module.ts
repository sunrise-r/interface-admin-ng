import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IadConfigService, IadModuleConfig, IadModuleConfigInterface, IadSharedModule } from 'iad-interface-admin/core';
import { IadProjectionFormModule, DynamicFormModule, IadReferenceProjectionProviderService } from 'iad-interface-admin/form';
import { FILTER_BUILDER, FilterBuilderService } from 'iad-interface-admin/filter';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ProjectionTreeComponent } from './projection-tree/projection-tree.component';
import { DropdownModule, MultiSelectModule, PanelMenuModule } from 'primeng/primeng';
import { ProjectionGridModule } from './projection-grid/projection-grid.module';
import { GridSettingsStorageService, SETTINGS_KEEPER } from './projection-grid/settings-manager/grid-settings-storage.service';



@NgModule({
    declarations: [ProjectionTreeComponent],
    imports: [
        CommonModule,
        IadSharedModule,
        HttpClientModule,
        MultiSelectModule,
        DropdownModule,
        PanelMenuModule,
        ProjectionGridModule,
        DynamicFormModule,
        IadProjectionFormModule
    ],
    exports: [TranslateModule, ProjectionGridModule, DynamicFormModule, IadProjectionFormModule, ProjectionTreeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IadInterfaceAdminModule {
    static forRoot(moduleConfig: IadModuleConfigInterface): ModuleWithProviders {
        return {
            ngModule: IadInterfaceAdminModule,
            providers: [
                {provide: IadModuleConfig, useValue: moduleConfig},
                {
                    provide: IadConfigService,
                    useClass: IadConfigService,
                    deps: [IadModuleConfig]
                },
                moduleConfig.referenceProjectionProvider || { provide: IadReferenceProjectionProviderService, useClass: IadReferenceProjectionProviderService },
                moduleConfig.filterBuilderProvider || { provide: FILTER_BUILDER, useClass: FilterBuilderService },
                moduleConfig.settingsKeeper || { provide: SETTINGS_KEEPER, useClass: GridSettingsStorageService }
            ]
        };
    }

    static forChild(moduleConfig: IadModuleConfigInterface): ModuleWithProviders {
        return {
            ngModule: IadInterfaceAdminModule,
            providers: [
                {provide: IadModuleConfig, useValue: moduleConfig},
                moduleConfig.referenceProjectionProvider || { provide: IadReferenceProjectionProviderService, useClass: IadReferenceProjectionProviderService },
                moduleConfig.filterBuilderProvider || { provide: FILTER_BUILDER, useClass: FilterBuilderService },
                moduleConfig.settingsKeeper || { provide: SETTINGS_KEEPER, useClass: GridSettingsStorageService }
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
