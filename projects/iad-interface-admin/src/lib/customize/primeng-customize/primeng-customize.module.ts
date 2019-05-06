import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Original
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { DomHandler } from 'primeng/components/dom/domhandler';
import { ObjectUtils } from 'primeng/components/utils/objectutils';
import {CheckboxModule, DropdownModule, MultiSelectModule, PanelModule} from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from 'primeng/shared';

// Extension
import { TooltipDirective } from './tooltip/tooltip.directive';
import { PanelMenuComponent } from './panelmenu/panelmenu.component';
import { PanelMenuSubComponent } from './panelmenu/panelmenu-sub.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DropdownComponent } from './dropdown/dropdown.component';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        CommonModule,
        TooltipModule,
        PanelModule,
        PanelMenuModule,
        MenuModule,
        TableModule,
        ButtonModule,
        TableModule,
        CommonModule,
        CalendarModule,
        ScrollPanelModule,
        AutoCompleteModule,
        InputTextModule,
        CheckboxModule,
        MultiSelectModule,
        DropdownModule,
        SharedModule,
        FontAwesomeModule
    ],
    declarations: [TooltipDirective, PanelMenuComponent, PanelMenuSubComponent, CalendarComponent, DropdownComponent],
    providers: [DomHandler, ObjectUtils],
    exports: [
        TooltipModule,
        TooltipDirective,
        PanelMenuModule,
        PanelModule,
        MenuModule,
        PanelMenuComponent,
        TableModule,
        ButtonModule,
        AutoCompleteModule,
        TableModule,
        CalendarModule,
        ScrollPanelModule,
        CalendarComponent,
        DropdownComponent,
        CheckboxModule,
        MultiSelectModule,
        DropdownModule
    ]
})
export class PrimengCustomizeModule {}
