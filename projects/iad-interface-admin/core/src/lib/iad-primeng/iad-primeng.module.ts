import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

// Original
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from 'primeng/shared';
import { ConfirmationService } from 'primeng/api';
import {
    CalendarModule,
    CheckboxModule,
    MultiSelectModule,
    EditorModule,
    DropdownModule,
    ChipsModule,
    ConfirmDialogModule,
    PanelModule,
    MenuModule, AutoCompleteModule
} from 'primeng/primeng';

// Customized
import { CalendarComponent } from './calendar/calendar.component';
import { IadScrollableViewComponent } from './table/iad-scrollable-view.component';
import { IadTableBodyComponent } from './table/iad-table-body.component';
import { IadTableComponent } from './table/iad-table.component';
import { TableKeysDirective } from './table-keys/table-keys.directive';
import { TooltipDirective } from './tooltip/tooltip.directive';

import { IadIconsModule } from '../iad-icons/iad-icons.module';

export const IAD_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    wheelSpeed: 0.25,
    wheelPropagation: true,
    minScrollbarLength: 20
};

@NgModule({
    imports: [
        CommonModule,
        InfiniteScrollModule,
        SharedModule,
        PanelModule,
        TableModule,
        TooltipModule,
        ButtonModule,
        InputTextModule,
        PaginatorModule,
        ConfirmDialogModule,
        CheckboxModule,
        ChipsModule,
        CalendarModule,
        MultiSelectModule,
        MenuModule,
        EditorModule,
        DropdownModule,
        IadIconsModule,
        AutoCompleteModule,
        PerfectScrollbarModule
    ],
    declarations: [
        IadScrollableViewComponent,
        IadTableBodyComponent,
        IadTableComponent,
        TableKeysDirective,
        TooltipDirective,
        CalendarComponent
    ],
    exports: [
        SharedModule,
        TooltipModule,
        ButtonModule,
        TableModule,
        MenuModule,
        ConfirmDialogModule,
        PanelModule,
        CheckboxModule,
        ChipsModule,
        CalendarModule,
        MultiSelectModule,
        EditorModule,
        DropdownModule,
        AutoCompleteModule,
        IadTableComponent,
        CalendarComponent,
        TooltipDirective,
        PerfectScrollbarModule
    ],
    providers: [
        ConfirmationService,
        {provide: PERFECT_SCROLLBAR_CONFIG, useValue: IAD_PERFECT_SCROLLBAR_CONFIG}
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IadPrimengModule {}
