import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import {TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ProjectionTreeComponent } from './projection-tree/projection-tree.component';
import {IadModuleConfig, IadModuleConfigInterface} from './config';
import { IadConfigService } from './config.service';
import { MultiSelectModule, PanelMenuModule } from 'primeng/primeng';
import {IadSharedModule} from './shared/iad-shared.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'i18n/', '.json');
}

@NgModule({
  declarations: [ProjectionTreeComponent],
  imports: [
    IadSharedModule,
    HttpClientModule,
    MultiSelectModule,
    PanelMenuModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [ProjectionTreeComponent],
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
}
