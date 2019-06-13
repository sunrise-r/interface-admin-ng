import { FilterBuilderService, FilterBuilderInterface, BuildOptions } from 'iad-interface-admin/filter';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DemoFilterBuilderService extends FilterBuilderService implements FilterBuilderInterface {
    constructor() {
        super();
    }
    afterBuildHook() {
        console.log('This happens every time when query is built inside FilterBuilderInterface');
    }
}
