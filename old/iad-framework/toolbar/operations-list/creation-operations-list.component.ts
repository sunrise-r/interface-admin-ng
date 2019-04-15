import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { OperationsListInterface } from './operations-list.interface';
import { DocumentFormProjection } from 'app/iad-framework/model/projection.model';
import { StringHelperService } from 'app/shared/util/string-helper.service';
import { StateStorageService } from 'app/core/auth/state-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

import { CatalogTreeHelper } from '../../catalog-tree/catalog-tree.helper';
import { CatalogTree } from '../../catalog-tree/catalog-tree.model';

@Component({
    selector: 'iad-creation-operations-list',
    template: `<iad-catalog-tree-hierarchy
        [catalogTree]="innerCatalogTree"
        (branchClick)="onClick($event)"
    ></iad-catalog-tree-hierarchy>`
})
export class CreationOperationsListComponent implements OperationsListInterface, OnInit, OnChanges {
    @Input() catalogTree: CatalogTree[];
    @Input() projections: DocumentFormProjection[];
    @Output() operationSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
    innerCatalogTree: CatalogTree[];

    constructor(public activatedRoute: ActivatedRoute, public router: Router, public stateStorageService: StateStorageService) {}

    ngOnInit(): void {
        this._initCatalogTree();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('projections' in changes) {
            this._initCatalogTree();
        }
    }

    onClick(catalogTree: CatalogTree): void {
        this.stateStorageService.storeUrl(this.router.url);
        const projectionCode = StringHelperService.camelToKebab(catalogTree.code);
        this.operationSelected.emit(true);
        this.router.navigate([projectionCode, 'create'], { relativeTo: this.activatedRoute });
    }

    /**
     * инициализирует дерево каталога
     * @private
     */
    private _initCatalogTree() {
        this.innerCatalogTree = CatalogTreeHelper.cloneCatalogBranchesRecursive(this.catalogTree);
        CatalogTreeHelper.updateCatalogTreeWithProjections(
            CatalogTreeHelper.findLastBranchRecursive(this.innerCatalogTree),
            this.projections
        );
    }
}
