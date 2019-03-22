export class CatalogTree {
    items: CatalogTree[];
    code?: string;
    url?: string;
    visible: boolean;

    constructor(public name: string, public root?: CatalogTree) {
        this.items = [];
        this.visible = true;
    }

    hasItems() {
        return this.items.length > 0;
    }

    clone() {
        const clone = new CatalogTree(this.name, this.root);
        clone.code = this.code;
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
