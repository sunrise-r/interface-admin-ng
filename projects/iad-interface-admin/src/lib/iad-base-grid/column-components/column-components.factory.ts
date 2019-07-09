import { DefaultColumnComponent } from './default-column.component';
import { ActionsColumnComponent } from './actions-column.component';
import { ChipsColumnComponent } from './chips-column.component';

/**
 * Do not add here components specific for your project. Use @Input() columnComponents instead;
 * Components with identical keys will be override
 */
export const columnComponents = {
    actions: ActionsColumnComponent,
    chips: ChipsColumnComponent,
    default: DefaultColumnComponent
};
