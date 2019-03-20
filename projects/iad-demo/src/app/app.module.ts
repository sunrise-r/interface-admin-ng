import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { IadInterfaceAdminModule } from 'iad-interface-admin';
import { MainComponent } from './main/main.component';
import {AppRoutingModule} from './app-routing.module';
import {fakeBackendProvider} from './faker/fake-backend.interceptor';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    IadInterfaceAdminModule.forRoot({
      i18nEnabled: true,
      defaultI18nLang: 'ru',
      noi18nMessage: 'translation-not-found'
    })
  ],
  providers: [
    fakeBackendProvider
  ],
  bootstrap: [MainComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
