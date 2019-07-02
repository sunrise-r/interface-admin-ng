import { NgModule } from '@angular/core';
import { ProjectionGridComponent } from './projection-grid/projection-grid.component';
import { IadSharedModule, IadPrimengModule } from 'iad-interface-admin/core';
import { IadBaseGridModule } from '../iad-base-grid/iad-base-grid.module';

import { GridToolbarComponent } from './grid-toolbar/grid-toolbar.component';
import { GridSearchPanelComponent } from './grid-search-panel/grid-search-panel.component';
import { IadToolbarModule } from '../toolbar/iad-toolbar.module';

@NgModule({
    declarations: [
        GridToolbarComponent,
        GridSearchPanelComponent,
        ProjectionGridComponent,
    ],
    imports: [
        IadPrimengModule,
        IadToolbarModule,
        IadSharedModule,
        IadBaseGridModule
    ],
    entryComponents: [],
    exports: [ProjectionGridComponent, GridToolbarComponent]
})
export class ProjectionGridModule {
}
