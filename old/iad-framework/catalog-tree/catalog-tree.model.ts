export class CatalogTree {
    items: CatalogTree[];
    visible: boolean;
    url?: any;

    constructor(public name: string, public code?: string, public translate?: boolean, public root?: CatalogTree) {
        this.items = [];
        this.visible = true;
    }

    hasItems() {
        return this.items.length > 0;
    }

    clone() {
        const clone = new CatalogTree(this.name, this.code, this.translate, this.root);
        clone.url = this.url;
        return clone;
    }

    hide() {
        this.visible = false;
    }

    show() {
        this.visible = true;
    }

    toggle(condition?: boolean) {
        this.visible = condition !== undefined ? condition : !this.visible;
    }
}
