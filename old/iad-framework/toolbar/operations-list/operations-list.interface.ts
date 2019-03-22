import { EventEmitter } from '@angular/core';
import { CatalogTree } from 'app/iad-framework/catalog-tree/catalog-tree.model';
import { DocumentFormProjection, IADPresentation } from 'app/iad-framework/model/projection.model';

export interface OperationsListInterface {
    catalogTree: CatalogTree[];
    innerCatalogTree: CatalogTree[];
    operationSelected: EventEmitter<boolean>;
    presentation: IADPresentation;
    projections: DocumentFormProjection[];

    onClick(catalogTree: CatalogTree): void;

    /**
     * Фильтрация проеекций
     */
    filterProjections(projections: DocumentFormProjection[]): DocumentFormProjection[];
}
