import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OperationsListInterface } from './operations-list.interface';
import { DocumentFormProjection } from 'app/iad-framework/model/projection.model.ts';
import { StringHelperService } from 'app/shared/util/string-helper.service.ts';
import { StateStorageService } from 'app/core/auth/state-storage.service.ts';
import { ActivatedRoute, Router } from '@angular/router';

import { CatalogTreeHelper } from '../../catalog-tree/catalog-tree.helper';
import { CatalogTree } from '../../catalog-tree/catalog-tree.model';
import { IADPresentation } from 'app/iad-framework/model/projection.model';

@Component({
    selector: 'iad-creation-operations-list',
    templateUrl: './operations-list.component.html'
})
export class CreationOperationsListComponent implements OperationsListInterface, OnInit {
    @Output() operationSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
    catalogTree: CatalogTree[];
    innerCatalogTree: CatalogTree[];
    presentation: IADPresentation;
    projections: DocumentFormProjection[];

    constructor(public activatedRoute: ActivatedRoute, public router: Router, public stateStorageService: StateStorageService) {}

    filterProjections(projections: DocumentFormProjection[]): DocumentFormProjection[] {
        return projections.filter(projection => projection.code.indexOf('Correction') === -1);
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({ model, params }) => {
            this.presentation = model;
            this.catalogTree = [params];
            this.projections = this.filterProjections(this.presentation.formProjections);
            this.innerCatalogTree = CatalogTreeHelper.cloneCatalogBranchesRecursive(this.catalogTree);
            CatalogTreeHelper.updateCatalogTreeWithProjections(
                CatalogTreeHelper.findLastBranchRecursive(this.innerCatalogTree),
                this.projections
            );
        });
    }

    onClick(catalogTree: CatalogTree): void {
        this.stateStorageService.storeUrl(this.router.url);
        const projectionCode = StringHelperService.camelToKebab(catalogTree.code);
        this.operationSelected.emit(true);
        this.router.navigate([projectionCode, 'create'], { relativeTo: this.activatedRoute });
    }
}
