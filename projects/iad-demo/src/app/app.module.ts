import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IadInterfaceAdminModule } from 'iad-interface-admin';
import { IadReferenceProjectionProviderService } from 'iad-interface-admin/form';
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from './app-routing.module';
import { fakeBackendProvider } from './faker/fake-backend.interceptor';

import { DataModule } from './data';
import { IadSharedModule } from './shared';
import { ReferenceProjectionProviderService } from './data/services/reference-projection-provider.service';

@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        IadSharedModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        IadInterfaceAdminModule.forRoot({
            i18nEnabled: true,
            defaultI18nLang: 'ru',
            noi18nMessage: 'translation-not-found',
            referenceProjectionProvider: {provide: IadReferenceProjectionProviderService, useClass: ReferenceProjectionProviderService}
            // rootUrl: '/myAwesomeRoot'
        }),
        DataModule
    ],
    providers: [
        fakeBackendProvider
    ],
    bootstrap: [MainComponent]
})
export class AppModule {
}
