import { NgModule } from '@angular/core';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';

import { PartnerGatewaySharedModule } from 'app/shared';

import { ToolbarActionDirective } from './toolbar-actions/toolbar-action.directive';
import { DocumentPathComponent } from './document-path/document-path.component';

// BAD OPTION
import { CustomizeModule } from 'app/customize';

import { PdfViewComponent } from './pdf-view/pdf-view.component';
import { ToolbarDropdownComponent } from './toolbar-dropdown/toolbar-dropdown.component';
import { OperationsListComponent } from './operations-list/operations-list.component';
import { CreationOperationsListComponent } from './operations-list/creation-operations-list.component';
import { OperationRemoveComponent } from './operation-remove/operation-remove.component';
import { CatalogTreeModule } from '../catalog-tree/catalog-tree.module';
import { ToolbarActionsComponent } from './toolbar-actions/toolbar-actions.component';
import { FilterBuilderModule } from '../filter-builder/filter-builder.module';

@NgModule({
    imports: [PartnerGatewaySharedModule, CustomizeModule, PdfJsViewerModule, CatalogTreeModule, FilterBuilderModule],
    declarations: [
        ToolbarActionDirective,
        DocumentPathComponent,
        PdfViewComponent,
        ToolbarDropdownComponent,
        OperationsListComponent,
        CreationOperationsListComponent,
        OperationRemoveComponent,
        ToolbarActionsComponent
    ],
    entryComponents: [DocumentPathComponent, PdfViewComponent, OperationRemoveComponent],
    exports: [
        DocumentPathComponent,
        ToolbarDropdownComponent,
        OperationsListComponent,
        CreationOperationsListComponent,
        OperationRemoveComponent,
        ToolbarActionsComponent
    ]
})
export class ToolbarModule {}
