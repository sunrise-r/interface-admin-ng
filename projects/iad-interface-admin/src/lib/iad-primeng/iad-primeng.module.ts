import { NgModule } from '@angular/core';
import { IadSharedModule } from '../shared/iad-shared.module';

// Original
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';

import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from 'primeng/shared';

// Table
import { IadScrollableViewComponent } from './table/iad-scrollable-view.component';
import { IadTableBodyComponent } from './table/iad-table-body.component';
import { IadTableComponent } from './table/iad-table.component';
import { TableKeysDirective } from './table-keys/table-keys.directive';

@NgModule({
    imports: [
        SharedModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        PaginatorModule,
        IadSharedModule
    ],
    declarations: [IadScrollableViewComponent, IadTableBodyComponent, IadTableComponent, TableKeysDirective],
    exports: [TableModule, ButtonModule, TableModule, IadTableComponent]
})
export class IadPrimengModule {}
