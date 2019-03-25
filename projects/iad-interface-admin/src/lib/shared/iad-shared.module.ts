import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MomentPipe} from './pipes/moment.pipe';
import {BooleanPipe} from './pipes/boolean.pipe';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'i18n/', '.json');
}

@NgModule({
  declarations: [MomentPipe, BooleanPipe],
  imports: [
    CommonModule,
    FormsModule,
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
    MomentPipe,
    BooleanPipe,
    TranslateModule
  ]
})
export class IadSharedModule { }
