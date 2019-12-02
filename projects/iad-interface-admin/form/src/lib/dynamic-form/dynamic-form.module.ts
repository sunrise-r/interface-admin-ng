import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IadPrimengModule, IadSharedModule, IadModuleConfig, IadModuleConfigInterface, IadConfigService, IadIconsModule, IAD_PERFECT_SCROLLBAR_CONFIG } from 'iad-interface-admin/core';

import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule, PanelModule } from 'primeng/primeng';

import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';

import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFieldDirective } from './dynamic-field.directive';
import { ElementFocusDirective } from './element-focus.directive';

import { FormatInputNamePipe } from './format-input-name.pipe';
import { IadFormDateComponent } from './components/iad-form-date.component';
import { IadFormFileComponent } from './components/iad-form-file.component';
import { IadFormInputComponent } from './components/iad-form-input.component';
import { IadFormNumberComponent } from './components/iad-form-number.component';
import { IadFormGroupComponent } from './components/iad-form-group.component';
import { IadFormDateTimeComponent } from './components/iad-form-date-time.component';
import { IadFormTextareaComponent } from './components/iad-form-textarea.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { IadFormCheckboxComponent } from './components/iad-form-checkbox.component';
import { IadFormDropdownComponent } from './components/iad-form-dropdown.component';
import { IadFormRichEditorComponent } from './components/iad-form-rich-editor.component';
import { IadFormChipsComponent } from './components/iad-form-chips.component';
import { IadFormTranslateInputComponent } from './components/iad-form-translate-input.component';
import { IadFormAutoCompleteInputComponent } from './components/iad-form-auto-complete-input.component';

@NgModule({
    imports: [CalendarModule, InputMaskModule, PanelModule, IadSharedModule, IadPrimengModule, IadIconsModule],
    declarations: [
        FileUploadComponent,
        DynamicFormComponent,
        FormatInputNamePipe,
        DynamicFieldDirective,
        ElementFocusDirective,
        IadFormDateComponent,
        IadFormInputComponent,
        IadFormNumberComponent,
        IadFormGroupComponent,
        IadFormFileComponent,
        IadFormDateTimeComponent,
        IadFormTextareaComponent,
        IadFormCheckboxComponent,
        IadFormDropdownComponent,
        IadFormRichEditorComponent,
        IadFormChipsComponent,
        IadFormTranslateInputComponent,
        IadFormAutoCompleteInputComponent
    ],
    entryComponents: [
        IadFormDateComponent,
        IadFormInputComponent,
        IadFormNumberComponent,
        IadFormGroupComponent,
        IadFormFileComponent,
        IadFormDateTimeComponent,
        IadFormTextareaComponent,
        IadFormCheckboxComponent,
        IadFormDropdownComponent,
        IadFormRichEditorComponent,
        IadFormChipsComponent,
        IadFormTranslateInputComponent,
        IadFormAutoCompleteInputComponent
    ],
    exports: [DynamicFormComponent, FormatInputNamePipe, FileUploadComponent, DynamicFieldDirective, ElementFocusDirective]
})
export class DynamicFormModule {
    static forRoot(moduleConfig: IadModuleConfigInterface): ModuleWithProviders {
        return {
            ngModule: DynamicFormModule,
            providers: [
                {provide: IadModuleConfig, useValue: moduleConfig},
                {
                    provide: IadConfigService,
                    useClass: IadConfigService,
                    deps: [IadModuleConfig]
                },
                {provide: PERFECT_SCROLLBAR_CONFIG, useValue: IAD_PERFECT_SCROLLBAR_CONFIG}
            ]
        };
    }

    static forChild(moduleConfig: IadModuleConfigInterface): ModuleWithProviders {
        return {
            ngModule: DynamicFormModule,
            providers: [
                {provide: IadModuleConfig, useValue: moduleConfig},
                {
                    provide: IadConfigService,
                    useClass: IadConfigService,
                    deps: [IadModuleConfig]
                },
                {provide: PERFECT_SCROLLBAR_CONFIG, useValue: IAD_PERFECT_SCROLLBAR_CONFIG}
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
