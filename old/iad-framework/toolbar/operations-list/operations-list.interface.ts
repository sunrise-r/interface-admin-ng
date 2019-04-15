import { EventEmitter } from '@angular/core';
import { CatalogTree } from 'app/iad-framework/catalog-tree/catalog-tree.model';
import { DocumentFormProjection } from 'app/iad-framework/model/projection.model';

export interface OperationsListInterface {
    catalogTree: CatalogTree[];
    innerCatalogTree: CatalogTree[];
    operationSelected: EventEmitter<boolean>;
    projections: DocumentFormProjection[];

    onClick(catalogTree: CatalogTree): void;
}
