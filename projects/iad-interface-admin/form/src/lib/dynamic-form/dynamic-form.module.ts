import {ModuleWithProviders, NgModule} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { IadPrimengModule, IadSharedModule, IadModuleConfig, IadModuleConfigInterface, IadConfigService } from 'iad-interface-admin/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule, PanelModule } from 'primeng/primeng';

import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFieldDirective } from './dynamic-field.directive';

import { FormatInputNamePipe } from './format-input-name.pipe';
import { IadFormDateComponent } from './components/iad-form-date.component';
import { IadFormFileComponent } from './components/iad-form-file.component';
import { IadFormInputComponent } from './components/iad-form-input.component';
import { IadFormNumberComponent } from './components/iad-form-number.component';
import { IadDropdownGroupComponent } from './components/iad-dropdown-group.component';
import { IadFormDateTimeComponent } from './components/iad-form-date-time.component';
import { IadFormTextareaComponent } from './components/iad-form-textarea.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import {IadFormCheckboxComponent} from './components/iad-form-checkbox.component';
import {IadFormMultiSelectComponent} from './components/iad-form-multi-select.component';
import {IadFormSelectionDropdownComponent} from './components/iad-form-selection-dropdown.component';
import {IadFormRichEditorComponent} from './components/iad-form-rich-editor.component';
import {IadFormChipsComponent} from './components/iad-form-chips.component';

@NgModule({
    imports: [CalendarModule, InputMaskModule, PanelModule, IadSharedModule, IadPrimengModule, FontAwesomeModule],
    declarations: [
        FileUploadComponent,
        DynamicFormComponent,
        FormatInputNamePipe,
        DynamicFieldDirective,
        IadFormDateComponent,
        IadFormInputComponent,
        IadFormNumberComponent,
        IadDropdownGroupComponent,
        IadFormFileComponent,
        IadFormDateTimeComponent,
        IadFormTextareaComponent,
        IadFormCheckboxComponent,
        IadFormMultiSelectComponent,
        IadFormSelectionDropdownComponent,
        IadFormRichEditorComponent,
        IadFormChipsComponent
    ],
    entryComponents: [
        IadFormDateComponent,
        IadFormInputComponent,
        IadFormNumberComponent,
        IadDropdownGroupComponent,
        IadFormFileComponent,
        IadFormDateTimeComponent,
        IadFormTextareaComponent,
        IadFormCheckboxComponent,
        IadFormMultiSelectComponent,
        IadFormSelectionDropdownComponent,
        IadFormRichEditorComponent,
        IadFormChipsComponent
    ],
    exports: [DynamicFormComponent, FormatInputNamePipe, FileUploadComponent, DynamicFieldDirective]
})
export class DynamicFormModule {
  static forRoot(moduleConfig: IadModuleConfigInterface): ModuleWithProviders {
    return {
      ngModule: DynamicFormModule,
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
      ngModule: DynamicFormModule,
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
