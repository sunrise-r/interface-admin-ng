import { NgModule } from '@angular/core';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';

import { PartnerGatewaySharedModule } from 'app/shared';

import { DropdownColumnSelectorComponent } from './dropdown-column-selector/dropdown-column-selector.component';
import { ToolbarActionDirective } from './table-toolbar/toolbar-action.directive';
import { TableToolbarComponent } from './table-toolbar/table-toolbar.component';
import { DocumentPathComponent } from './document-path/document-path.component';
import { DocumentRemoveComponent } from './document-remove/document-remove.component';
import { CustomizeModule } from 'app/customize';
import { PdfViewComponent } from './pdf-view/pdf-view.component';
import { ToolbarDropdownComponent } from './toolbar-dropdown/toolbar-dropdown.component';
import { OperationsListComponent } from './operations-list/operations-list.component';
import { CreationOperationsListComponent } from './operations-list/creation-operations-list.component';
import { FilterToolbarListComponent } from 'app/iad-framework/toolbar/filter/filter-toolbar.component.ts';
import { OperationRemoveComponent } from './operation-remove/operation-remove.component';

@NgModule({
    imports: [PartnerGatewaySharedModule, CustomizeModule, PdfJsViewerModule],
    declarations: [
        DropdownColumnSelectorComponent,
        ToolbarActionDirective,
        TableToolbarComponent,
        DocumentPathComponent,
        DocumentRemoveComponent,
        PdfViewComponent,
        ToolbarDropdownComponent,
        OperationsListComponent,
        CreationOperationsListComponent,
        FilterToolbarListComponent,
        OperationRemoveComponent
    ],
    entryComponents: [DocumentPathComponent, DocumentRemoveComponent, PdfViewComponent, OperationRemoveComponent],
    exports: [
        TableToolbarComponent,
        DocumentPathComponent,
        DocumentRemoveComponent,
        ToolbarDropdownComponent,
        DropdownColumnSelectorComponent,
        OperationsListComponent,
        CreationOperationsListComponent,
        FilterToolbarListComponent,
        OperationRemoveComponent
    ]
})
export class ToolbarModule {}
