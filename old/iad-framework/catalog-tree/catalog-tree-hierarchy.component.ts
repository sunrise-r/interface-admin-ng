import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CatalogTree } from './catalog-tree.model';

@Component({
    selector: 'iad-catalog-tree-hierarchy',
    templateUrl: 'catalog-tree-hierarchy.component.html'
})
export class CatalogTreeHierarchyComponent {
    @Input() catalogTree: CatalogTree[] = [];
    @Output() branchClick: EventEmitter<CatalogTree> = new EventEmitter<CatalogTree>();
    onClick(catalogTree: CatalogTree): void {
        this.branchClick.emit(catalogTree);
    }
}
