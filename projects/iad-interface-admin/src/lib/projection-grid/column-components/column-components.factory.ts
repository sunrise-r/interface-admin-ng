import { SelectionIndicatorColumnComponent } from './selection-indicator-column.component';
import { DefaultColumnComponent } from './default-column.component';
import { SpecialColumnComponent } from './special-column.component';
import {ActionsColumnComponent} from './actions-column.component';
import {ChipsColumnComponent} from './chips-column.component';

export const columnComponents = {
  SelectionIndicatorColumnComponent,
  SpecialColumnComponent,
  actions: ActionsColumnComponent,
  chips: ChipsColumnComponent,
  default: DefaultColumnComponent
};
