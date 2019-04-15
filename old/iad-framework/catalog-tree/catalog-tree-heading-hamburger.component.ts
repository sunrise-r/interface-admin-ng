import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CatalogTreeHelper } from './catalog-tree.helper';
import { CatalogTree } from './catalog-tree.model';

@Component({
    selector: 'iad-catalog-tree-heading-hamburger',
    template: `<iad-heading-hamburger
        [currentItem]="currentItem"
        [doTranslate]="doTranslate"
        [items]="items"
        (select)="onSelect($event)">
        <ng-template iadHamburgerTemplate="label">
            <jhi-catalog-tree-breadcrumbs
                [catalogTree]="catalogTree"
            ></jhi-catalog-tree-breadcrumbs>
        </ng-template>
        <ng-template iadHamburgerTemplate="dropdown" let-items let-currentItem="currentItem">
            <iad-catalog-tree-hierarchy
                [catalogTree]="innerCatalogTree"
                (branchClick)="onSelect($event)"
            ></iad-catalog-tree-hierarchy>
        </ng-template>
    </iad-heading-hamburger>`
})
export class CatalogTreeHeadingHamburgerComponent implements OnChanges {
    @Input() catalogTree: CatalogTree[];
    @Input() currentItem: any;
    @Input() items: any[];
    @Input() doTranslate: boolean;
    @Output() select: EventEmitter<any> = new EventEmitter<any>();

    innerCatalogTree: CatalogTree[];

    ngOnChanges(changes: SimpleChanges): void {
        if (('items' in changes || 'catalogTree' in changes) && this.catalogTree && this.items) {
            this.initCatalogTree(this.catalogTree);
        }
    }

    initCatalogTree(path: CatalogTree[]) {
        this.innerCatalogTree = CatalogTreeHelper.cloneCatalogBranchesRecursive(path);
        this.updateCatalogTreeWithMenuItems(CatalogTreeHelper.findLastBranchRecursive(this.innerCatalogTree));
    }

    onSelect($event) {
        this.select.emit($event);
    }

    /**
     * Add default operations to Inner Catalog Tree
     * @param item
     */
    protected updateCatalogTreeWithMenuItems(item: CatalogTree): CatalogTree {
        item.items = item.items.concat(
            this.items.map(_item => {
                const ct = new CatalogTree(_item.label, _item.code, false, item);
                ct.url = _item.routerLink;
                return ct;
            })
        );
        return item;
    }
}
