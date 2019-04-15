import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CatalogTree } from './catalog-tree.model';
import { ActivatedRoute } from '@angular/router';
import { CatalogTreeHelper } from './catalog-tree.helper';

@Component({
    selector: 'jhi-catalog-tree-breadcrumbs',
    template: `
        <ng-template #nodeTemplateRef let-item>
            <span jhiTranslate="{{item.name}}"></span>
            <ng-template [ngIf]="item.hasItems()">
                <span class="breadcrumb-arrow"></span>
                <ng-template ngFor let-last let-item [ngForOf]="item.items">
                    <ng-template
                        [ngTemplateOutlet]="nodeTemplateRef"
                        [ngTemplateOutletContext]="{ $implicit: item }">
                    </ng-template>
                    <ng-template [ngIf]="!last">
                        <span class="breadcrumb-arrow"></span>
                    </ng-template>
                </ng-template>
            </ng-template>
        </ng-template>

        <ng-template [ngIf]="innerCatalogTree">
            <ng-template
                [ngTemplateOutlet]="nodeTemplateRef"
                [ngTemplateOutletContext]="{ $implicit: innerCatalogTree[0]}">
            </ng-template>
        </ng-template>`
})
export class CatalogTreeBreadcrumbsComponent implements OnChanges {
    @Input() catalogTree: CatalogTree[];
    @Input() additionalLabels: string[];
    innerCatalogTree: CatalogTree[];

    constructor(public activatedRoute: ActivatedRoute) {}

    ngOnChanges(changes: SimpleChanges): void {
        if ('catalogTree' in changes) {
            this.innerCatalogTree = CatalogTreeHelper.cloneCatalogBranchesRecursive(this.catalogTree);
            if (this.additionalLabels) {
                const item = CatalogTreeHelper.findLastBranchRecursive(this.innerCatalogTree);
                this.additionalLabels.forEach(label => {
                    item.items.push(new CatalogTree(label, null, true));
                });
            }
        }
    }
}
