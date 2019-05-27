import {CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {DynamicFormModule} from 'iad-interface-admin/form';
import {IadConfigService, IadModuleConfig, IadModuleConfigInterface, IadSharedModule} from 'iad-interface-admin/core';

import {TranslateModule, TranslateService} from '@ngx-translate/core';

import {ProjectionTreeComponent} from './projection-tree/projection-tree.component';
import {DropdownModule, MultiSelectModule, PanelMenuModule} from 'primeng/primeng';
import {ProjectionGridModule} from './projection-grid/projection-grid.module';
import {ProjectionFormModule} from './projection-form/projection-form.module';
import {IadRouterHistoryService} from './public-services/iad-router-history.service';

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
    ProjectionFormModule
  ],
  exports: [TranslateModule, ProjectionGridModule, ProjectionTreeComponent, ProjectionFormModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IadInterfaceAdminModule {
  static forRoot(moduleConfig: IadModuleConfigInterface): ModuleWithProviders {
    return {
      ngModule: IadInterfaceAdminModule,
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
      ngModule: IadInterfaceAdminModule,
      providers: [{ provide: IadModuleConfig, useValue: moduleConfig }]
    };
  }

  constructor(translate: TranslateService, config: IadConfigService, iadRouterHistoryService: IadRouterHistoryService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(config.getConfig().defaultI18nLang);

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(config.getConfig().defaultI18nLang);
  }
}
