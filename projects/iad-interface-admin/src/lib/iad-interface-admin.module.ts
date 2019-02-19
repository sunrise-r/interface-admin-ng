import { NgModule, ModuleWithProviders, NgModule, Sanitizer } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { IadInterfaceAdminComponent } from './iad-interface-admin.component';
import { ProjectionTreeComponent } from './projection-tree/projection-tree.component';
import { IadModuleConfig } from './config';
import { IadConfigService } from './config.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'i18n/', '.json');
}

@NgModule({
  declarations: [IadInterfaceAdminComponent, ProjectionTreeComponent],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [ProjectionTreeComponent]
})
export class IadInterfaceAdminModule {
  static forRoot(moduleConfig: IadModuleConfig): ModuleWithProviders {
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
  static forChild(moduleConfig: IadModuleConfig): ModuleWithProviders {
    return {
      ngModule: IadInterfaceAdminModule,
      providers: [{ provide: IadModuleConfig, useValue: moduleConfig }]
    };
  }
}
