import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {CommonModule} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ProjectionTreeComponent } from './projection-tree/projection-tree.component';
import {IadModuleConfig, IadModuleConfigInterface} from './config';
import { IadConfigService } from './config.service';
import { MultiSelectModule, PanelMenuModule } from 'primeng/primeng';
import {IadSharedModule} from './shared/iad-shared.module';
import { ProjectionGridModule } from './projection-grid/projection-grid.module'

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'i18n/', '.json');
}

@NgModule({
  declarations: [ProjectionTreeComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
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
    }),
    ProjectionGridModule
  ],
  exports: [TranslateModule, ProjectionGridModule, ProjectionTreeComponent],
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

  constructor(translate: TranslateService, config: IadConfigService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(config.getConfig().defaultI18nLang);

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(config.getConfig().defaultI18nLang);
  }
}
