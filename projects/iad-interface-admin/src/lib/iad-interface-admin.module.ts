import { NgModule } from '@angular/core';
import { IadInterfaceAdminComponent } from './iad-interface-admin.component';
import { ProjectionTreeComponent } from './projection-tree/projection-tree.component';

@NgModule({
  declarations: [IadInterfaceAdminComponent, ProjectionTreeComponent],
  imports: [
  ],
  exports: [IadInterfaceAdminComponent]
})
export class IadInterfaceAdminModule { }
