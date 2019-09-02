import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IadIconOutletComponent } from './iad-icon-outlet.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faChevronUp,
    faChevronDown,
    faChevronLeft,
    faChevronRight,
    faCaretDown,
    faCaretUp,
    faEdit,
    faTrash,
    faCheckCircle,
    faExclamationCircle,
    faSort, faSortUp, faSortDown
} from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
library.add(faSort, faSortUp, faSortDown, faChevronUp, faChevronDown, faChevronLeft, faChevronRight, faCaretDown, faCaretUp, faEdit, faTrash, faCheckCircle, faExclamationCircle);

@NgModule({
    imports: [CommonModule, FontAwesomeModule],
    declarations: [IadIconOutletComponent],
    entryComponents: [IadIconOutletComponent],
    exports: [FontAwesomeModule, IadIconOutletComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IadIconsModule {}
