import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { OperationsListInterface } from './operations-list.interface';
import { DocumentFormProjection } from 'app/iad-framework/model/projection.model';
import { SelectionBufferService } from 'app/iad-framework/data-table/services/selection-buffer.service';
import { CatalogTree } from '../../catalog-tree/catalog-tree.model';
import { StringHelperService } from 'app/shared/util/string-helper.service';
import { StateStorageService } from 'app/core/auth/state-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

import { CatalogTreeHelper } from '../../catalog-tree/catalog-tree.helper';
import { constantFieldNames } from './operations-list.constants';

import { RegularOperationsToggleService } from './regular-operations-toggle.service';

@Component({
    selector: 'iad-operations-list',
    template: `<iad-catalog-tree-hierarchy
        [catalogTree]="innerCatalogTree"
        (branchClick)="onClick($event)"
    ></iad-catalog-tree-hierarchy>`,
    providers: [RegularOperationsToggleService]
})
export class OperationsListComponent implements OperationsListInterface, OnChanges {
    @Input() catalogTree: CatalogTree[];
    @Input() projections: DocumentFormProjection[];

    /**
     * Текущая выбранная запись
     */
    @Input() selection: any;

    /**
     * Флаг "Добавлять стандартные операции"
     */
    @Input() addCommonOperations = true;

    @Output() operationSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
    innerCatalogTree: CatalogTree[];

    constructor(
        public activatedRoute: ActivatedRoute,
        public router: Router,
        public selectionBufferService: SelectionBufferService,
        public stateStorageService: StateStorageService,
        public regularOperationsToggleService: RegularOperationsToggleService
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if ('projections' in changes && this.catalogTree) {
            this._initCatalogTree(this.catalogTree);
        }
        if ('selection' in changes && this.catalogTree) {
            const catalogTree = this._initCatalogTree(this.catalogTree);
            catalogTree.items = this.regularOperationsToggleService.updateOperationsState(catalogTree.items, this.selection);
        }
    }

    onClick(catalogTree: CatalogTree): void {
        this.stateStorageService.storeUrl(this.router.url);
        const projectionCode = StringHelperService.camelToKebab(catalogTree.code);
        const routeRoot = constantFieldNames.indexOf(catalogTree.code) !== -1 ? this.selectionBufferService.getClassName() : 'correction';
        this.operationSelected.emit(true);
        this.router.navigate([StringHelperService.camelToKebab(routeRoot), projectionCode, this.selectionBufferService.getDTO().id], {
            relativeTo: this.activatedRoute
        });
    }

    /**
     * Add default operations to Inner Catalog Tree
     * @param item
     */
    private _updateCatalogTreeWithConstantFields(item: CatalogTree): CatalogTree {
        if (this.addCommonOperations) {
            item.items = item.items.concat(
                constantFieldNames.map(code => new CatalogTree('partnerGatewayApp.commonPresentation.' + code, code, true))
            );
        }
        return item;
    }

    /**
     * Will update Inner Catalog Tree with current selection ClassName
     */
    private _updateCatalogTreeWithClassName(): CatalogTree[] {
        const className = this.selectionBufferService.getClassName();
        const item = CatalogTreeHelper.findLastBranchRecursive(this.innerCatalogTree);
        item.items.push(new CatalogTree('partnerGatewayApp.partnerDocuments.documentType.' + className, null, true, item));
        return this.innerCatalogTree;
    }

    /**
     * инициализирует дерево каталога
     * @private
     */
    private _initCatalogTree(catalogTree: CatalogTree[]) {
        this.innerCatalogTree = CatalogTreeHelper.cloneCatalogBranchesRecursive(catalogTree);
        this.innerCatalogTree = this._updateCatalogTreeWithClassName();

        return CatalogTreeHelper.updateCatalogTreeWithProjections(
            this._updateCatalogTreeWithConstantFields(CatalogTreeHelper.findLastBranchRecursive(this.innerCatalogTree)),
            this.projections
        );
    }
}
