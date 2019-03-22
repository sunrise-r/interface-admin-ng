import { CatalogTree } from './catalog-tree.model';

export class CatalogTreeHelper {
    /**
     * Will update innerCatalogTree with projections
     */
    static updateCatalogTreeWithProjections(item: CatalogTree, projections: any): CatalogTree {
        if (item) {
            item.items = item.items.concat(
                projections.map(projection => {
                    const branch = new CatalogTree(projection.title, item);
                    branch.code = projection.code;
                    return branch;
                })
            );
        }
        return item;
    }

    /**
     * Will find recursively last branch
     */
    static findLastBranchRecursive(items: CatalogTree[]) {
        let branch: CatalogTree;
        if (Array.isArray(items)) {
            items.forEach(item => {
                if (item.hasItems()) {
                    // We will take only first item of list. Because we don't know about what to do with multiple items;
                    branch = CatalogTreeHelper.findLastBranchRecursive([item.items[0]]);
                } else {
                    branch = item;
                }
            });
        }
        return branch;
    }

    /**
     * Recursive clone of the Catalog Tree Branches
     */
    static cloneCatalogBranchesRecursive(items: CatalogTree[]) {
        const clone: CatalogTree[] = [];
        if (Array.isArray(items)) {
            items.forEach(item => {
                const itemClone = item.clone();
                if (item.hasItems()) {
                    itemClone.items = CatalogTreeHelper.cloneCatalogBranchesRecursive(item.items);
                }
                clone.push(itemClone);
            });
        }
        return clone;
    }
}
