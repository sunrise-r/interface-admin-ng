import { Component, Input, TemplateRef } from '@angular/core';

import { Table, TableBody } from 'primeng/table';
import { Column } from 'primeng/shared';

@Component({
    selector: '[iadTableBody]',
    templateUrl: './iad-table-body.component.html'
})
export class IadTableBodyComponent extends TableBody {
    @Input('iadTableBody')
    get partnerColumns(): Column[] {
        return this.columns;
    }

    set partnerColumns(columns: Column[]) {
        this.columns = columns;
    }

    @Input('iadTableBodyTemplate')
    get partnerTemplate(): TemplateRef<any> {
        return this.template;
    }

    set partnerTemplate(template: TemplateRef<any>) {
        this.template = template;
    }

    constructor(public dt: Table) {
        super(dt);
    }
}
