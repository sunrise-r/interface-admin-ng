import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// Original
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from 'primeng/shared';
import { MenuModule } from 'primeng/menu';

// Table
import { IadScrollableViewComponent } from './table/iad-scrollable-view.component';
import { IadTableBodyComponent } from './table/iad-table-body.component';
import { IadTableComponent } from './table/iad-table.component';
import { TableKeysDirective } from './table-keys/table-keys.directive';

import {IadSharedModule} from '../shared/iad-shared.module';

@NgModule({
    imports: [
        InfiniteScrollModule,
        CommonModule,
        IadSharedModule,
        TableModule,
        ButtonModule,
        TableModule,
        CommonModule,
        InputTextModule,
        PaginatorModule,
        SharedModule,
        MenuModule
    ],
    declarations: [IadScrollableViewComponent, IadTableBodyComponent, IadTableComponent, TableKeysDirective],
    exports: [TableModule, ButtonModule, TableModule, IadTableComponent, MenuModule]
})
export class IadPrimengModule {}
