import { FilterBuilderService, FilterBuilderInterface, BuildOptions } from 'iad-interface-admin/filter';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DemoFilterBuilderService extends FilterBuilderService implements FilterBuilderInterface{
    constructor() {
        super();
    }
    build(options: BuildOptions): string {
        console.log('We only override the default FilterBuilderService');
        return super.build(options);
    }
}
