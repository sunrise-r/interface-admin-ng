import { Component, Input, TemplateRef } from '@angular/core';

import { Table, TableBody } from 'primeng/table';
import { Column } from 'primeng/shared';

@Component({
    selector: '[iadTableBody]',
    templateUrl: './iad-table-body.component.html'
})
export class IadTableBodyComponent extends TableBody {

    @Input('iadTableBody') columns: Column[];

    @Input('iadTableBodyTemplate') template: TemplateRef<any>;

    constructor(public dt: Table) {
        super(dt);
    }
}
