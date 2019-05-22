import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Original
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { DomHandler } from 'primeng/components/dom/domhandler';
import { ObjectUtils } from 'primeng/components/utils/objectutils';
import {CheckboxModule, DropdownModule, EditorModule, MultiSelectModule, PanelModule} from 'primeng/primeng';

import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from 'primeng/shared';

// Extension
import { TooltipDirective } from './tooltip/tooltip.directive';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        CommonModule,
        TooltipModule,
        PanelModule,
        MenuModule,
        TableModule,
        ButtonModule,
        TableModule,
        CommonModule,
        ScrollPanelModule,
        AutoCompleteModule,
        InputTextModule,
        CheckboxModule,
        MultiSelectModule,
        DropdownModule,
        EditorModule,
        SharedModule,
        FontAwesomeModule
    ],
    declarations: [
        TooltipDirective],
    providers: [DomHandler, ObjectUtils],
    exports: [
        TooltipModule,
        TooltipDirective,
        PanelModule,
        MenuModule,
        TableModule,
        ButtonModule,
        AutoCompleteModule,
        TableModule,
        ScrollPanelModule,
        CheckboxModule,
        MultiSelectModule,
        EditorModule,
        DropdownModule
    ]
})
export class PrimengCustomizeModule {}
