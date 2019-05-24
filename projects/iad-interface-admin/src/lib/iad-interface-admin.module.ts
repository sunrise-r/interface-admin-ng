import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {IadConfigService, IadModuleConfig, IadModuleConfigInterface, IadEnvModule} from 'iad-interface-admin/core';
import {DynamicFormModule} from 'iad-interface-admin/form';

import {TranslateModule, TranslateService} from '@ngx-translate/core';

import {ProjectionTreeComponent} from './projection-tree/projection-tree.component';
import {DropdownModule, MultiSelectModule, PanelMenuModule} from 'primeng/primeng';
import {IadSharedModule} from 'iad-interface-admin/core';
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
export class IadInterfaceAdminModule extends IadEnvModule {
  constructor(translate: TranslateService, config: IadConfigService, routerHistory: IadRouterHistoryService) {
    super(translate, config)
  }
}
