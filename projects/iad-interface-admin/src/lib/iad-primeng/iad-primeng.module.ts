import { NgModule } from '@angular/core';
import { IadSharedModule } from '../shared/iad-shared.module';

// Original
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';

import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from 'primeng/shared';
import {ConfirmationService} from 'primeng/api';

// Table
import { IadScrollableViewComponent } from './table/iad-scrollable-view.component';
import { IadTableBodyComponent } from './table/iad-table-body.component';
import { IadTableComponent } from './table/iad-table.component';
import { TableKeysDirective } from './table-keys/table-keys.directive';
import {ChipsModule, ConfirmDialogModule} from 'primeng/primeng';

@NgModule({
    imports: [
        SharedModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        PaginatorModule,
        IadSharedModule,
        ConfirmDialogModule,
        ChipsModule
    ],
    declarations: [IadScrollableViewComponent, IadTableBodyComponent, IadTableComponent, TableKeysDirective],
    exports: [TableModule, ButtonModule, TableModule, IadTableComponent, ConfirmDialogModule, ChipsModule],
    providers: [ConfirmationService]
})
export class IadPrimengModule {}
