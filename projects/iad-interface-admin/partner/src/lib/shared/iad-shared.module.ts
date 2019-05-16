import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MomentPipe} from './pipes/moment.pipe';
import {BooleanPipe} from './pipes/boolean.pipe';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faChevronUp, faChevronDown, faChevronLeft, faChevronRight, faEdit, faTrash, faCheckCircle, faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import {StatusPipe} from './pipes/status.pipe';

library.add(faChevronUp, faChevronDown, faChevronLeft, faChevronRight, faEdit, faTrash, faCheckCircle, faExclamationCircle);

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'i18n/', '.json');
}

@NgModule({
  declarations: [MomentPipe, BooleanPipe, StatusPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
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
    FontAwesomeModule,
    MomentPipe,
    BooleanPipe,
    StatusPipe,
    TranslateModule
  ]
})
export class IadSharedModule { }