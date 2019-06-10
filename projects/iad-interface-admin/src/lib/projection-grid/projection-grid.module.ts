import { NgModule } from '@angular/core';
import { ProjectionGridComponent } from './projection-grid/projection-grid.component';
import { IadSharedModule, IadPrimengModule } from 'iad-interface-admin/core';
import { IadBaseGridModule } from '../iad-base-grid/iad-base-grid.module';

@NgModule({
    declarations: [
        ProjectionGridComponent
    ],
    imports: [
        IadPrimengModule,
        IadSharedModule,
        IadBaseGridModule
    ],
    entryComponents: [],
    exports: [ProjectionGridComponent]
})
export class ProjectionGridModule {
}
