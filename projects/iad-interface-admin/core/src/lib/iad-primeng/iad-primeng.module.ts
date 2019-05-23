import { NgModule } from '@angular/core';
import { IadSharedModule } from '../shared/iad-shared.module';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// Original
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from 'primeng/shared';
import { ConfirmationService } from 'primeng/api';
import { CalendarModule, CheckboxModule, MultiSelectModule, EditorModule, DropdownModule, ChipsModule, ConfirmDialogModule, PanelModule, MenuModule } from 'primeng/primeng';

// Customized
import { CalendarComponent } from './calendar/calendar.component';
import { IadScrollableViewComponent } from './table/iad-scrollable-view.component';
import { IadTableBodyComponent } from './table/iad-table-body.component';
import { IadTableComponent } from './table/iad-table.component';
import { TableKeysDirective } from './table-keys/table-keys.directive';
import { TooltipDirective } from './tooltip/tooltip.directive';

@NgModule({
    imports: [
      InfiniteScrollModule,
      SharedModule,
      PanelModule,
      TableModule,
      TooltipModule,
      ButtonModule,
      InputTextModule,
      PaginatorModule,
      IadSharedModule,
      ConfirmDialogModule,
      CheckboxModule,
      ChipsModule,
      CalendarModule,
      MultiSelectModule,
      MenuModule,
      EditorModule,
      DropdownModule
    ],
    declarations: [IadScrollableViewComponent, IadTableBodyComponent, IadTableComponent, TableKeysDirective, TooltipDirective, CalendarComponent],
    exports: [TableModule, ButtonModule, TableModule, MenuModule, IadTableComponent, ConfirmDialogModule, PanelModule, CheckboxModule, ChipsModule, TooltipDirective, CalendarComponent, CalendarModule, MultiSelectModule, EditorModule, DropdownModule],
    providers: [ConfirmationService]
})
export class IadPrimengModule {}
