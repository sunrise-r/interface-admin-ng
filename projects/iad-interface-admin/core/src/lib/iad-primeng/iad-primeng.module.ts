import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// import { IadSharedModule } from '../shared/iad-shared.module';

// Original
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from 'primeng/shared';
import { ConfirmationService } from 'primeng/api';
import { CalendarModule, CheckboxModule, MultiSelectModule, EditorModule, DropdownModule, ChipsModule, ConfirmDialogModule, PanelModule, MenuModule } from 'primeng/primeng';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Customized
import { CalendarComponent } from './calendar/calendar.component';
import { IadScrollableViewComponent } from './table/iad-scrollable-view.component';
import { IadTableBodyComponent } from './table/iad-table-body.component';
import { IadTableComponent } from './table/iad-table.component';
import { TableKeysDirective } from './table-keys/table-keys.directive';
import { TooltipDirective } from './tooltip/tooltip.directive';

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
      FontAwesomeModule
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
      IadTableComponent,
      CalendarComponent,
      TooltipDirective
    ],
    providers: [ConfirmationService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IadPrimengModule {}
