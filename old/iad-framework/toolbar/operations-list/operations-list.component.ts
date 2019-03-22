import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { OperationsListInterface } from './operations-list.interface';
import { DocumentFormProjection } from 'app/iad-framework/model/projection.model.ts';
import { SelectionBufferService } from 'app/iad-framework/data-table/services/selection-buffer.service.ts';
import { CatalogTree } from '../../catalog-tree/catalog-tree.model';
import { StringHelperService } from 'app/shared/util/string-helper.service.ts';
import { StateStorageService } from 'app/core/auth/state-storage.service.ts';
import { ActivatedRoute, Router } from '@angular/router';

import { CatalogTreeHelper } from '../../catalog-tree/catalog-tree.helper';
import { IADPresentation } from 'app/iad-framework/model/projection.model';
import { constantFieldNames } from './operations-list.constants';

import { RegularOperationsToggleService } from './regular-operations-toggle.service';

@Component({
    selector: 'iad-operations-list',
    templateUrl: './operations-list.component.html',
    providers: [RegularOperationsToggleService]
})
export class OperationsListComponent implements OperationsListInterface, OnInit, OnChanges {
    @Output() operationSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
    catalogTree: CatalogTree[];
    innerCatalogTree: CatalogTree[];
    presentation: IADPresentation;
    projections: DocumentFormProjection[];

    constructor(
        public activatedRoute: ActivatedRoute,
        public router: Router,
        public selectionBufferService: SelectionBufferService,
        public stateStorageService: StateStorageService,
        public regularOperationsToggleService: RegularOperationsToggleService
    ) {}

    filterProjections(projections: DocumentFormProjection[]): DocumentFormProjection[] {
        const className = this.selectionBufferService.getClassName();
        return className
            ? projections.filter(projection => {
                  return (
                      projection.code.indexOf('Correction') !== -1 &&
                      (projection.properties && projection.properties.className ? projection.properties.className === className : true)
                  );
              })
            : [];
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({ model, params }) => {
            this.presentation = model;
            this.catalogTree = [params];
        });
        this.selectionBufferService.dataUpdated.subscribe(selection => {
            this.projections = this.filterProjections(this.presentation.formProjections);
            this.innerCatalogTree = CatalogTreeHelper.cloneCatalogBranchesRecursive(this.catalogTree);
            this.innerCatalogTree = this.updateCatalogTreeWithClassName();

            const catalogTree = CatalogTreeHelper.updateCatalogTreeWithProjections(
                this.updateCatalogTreeWithConstantFields(CatalogTreeHelper.findLastBranchRecursive(this.innerCatalogTree)),
                this.projections
            );

            this.regularOperationsToggleService.updateOperationsState(catalogTree.items, selection);
        });
    }

    ngOnChanges(changes: SimpleChanges): void {}

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
     * Will update Inner Catalog Tree with current selection ClassName
     */
    private updateCatalogTreeWithClassName(): CatalogTree[] {
        const className = this.selectionBufferService.getClassName();
        const item = CatalogTreeHelper.findLastBranchRecursive(this.innerCatalogTree);
        item.items.push(new CatalogTree('partnerGatewayApp.partnerDocuments.documentType.' + className, item));
        return this.innerCatalogTree;
    }

    /**
     * Add default operations to Inner Catalog Tree
     * @param item
     */
    protected updateCatalogTreeWithConstantFields(item: CatalogTree): CatalogTree {
        item.items = item.items.concat(
            constantFieldNames.map(code => {
                const catalogTree = new CatalogTree('partnerGatewayApp.commonPresentation.' + code);
                catalogTree.code = code;
                return catalogTree;
            })
        );
        return item;
    }
}
