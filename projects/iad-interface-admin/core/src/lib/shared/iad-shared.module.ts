import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentPipe } from './pipes/moment.pipe';
import { BooleanPipe } from './pipes/boolean.pipe';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TooltipNotifierComponent } from './tooltip-notifier/tooltip-notifier.component';
import { IadPrimengModule } from '../iad-primeng/iad-primeng.module';
import { IadIconsModule } from '../iad-icons/iad-icons.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, 'i18n/', '.json');
}

@NgModule({
    declarations: [MomentPipe, BooleanPipe, TooltipNotifierComponent],
    imports: [
        CommonModule,
        IadPrimengModule,
        FormsModule,
        ReactiveFormsModule,
        IadIconsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IadIconsModule,
        MomentPipe,
        BooleanPipe,
        TranslateModule,
        TooltipNotifierComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IadSharedModule {
}
