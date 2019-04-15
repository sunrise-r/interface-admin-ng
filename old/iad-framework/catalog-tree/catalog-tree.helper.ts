import { CatalogTree } from './catalog-tree.model';

export class CatalogTreeHelper {
    /**
     * Will update innerCatalogTree with projections
     */
    static updateCatalogTreeWithProjections(item: CatalogTree, projections: any): CatalogTree {
        if (item && projections) {
            item.items = item.items.concat(projections.map(projection => new CatalogTree(projection.title, projection.code, true, item)));
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

    /**
     * Populate hierarchy of route params documents/{level1}/{level2}
     * @param plain
     * @param translate
     */
    static createTreeFromPlain(plain: { [p: string]: string }, translate?: boolean): CatalogTree {
        const key = Object.keys(plain).shift();
        const hierarchy = new CatalogTree(plain[key], null, translate);
        delete plain[key];
        if (Object.keys(plain).length > 0) {
            hierarchy.items.push(CatalogTreeHelper.createTreeFromPlain(plain, translate));
        }
        return hierarchy;
    }
}
