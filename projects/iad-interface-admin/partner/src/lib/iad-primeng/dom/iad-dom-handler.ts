import { DomHandler } from 'primeng/api';

export class IadDomHandler extends DomHandler {
    /**
     * Recursively looks for parent by css class
     * @param element
     * @param className
     */
    static findParentByClassName(element: HTMLElement, className: string): HTMLElement {
        const parent = <HTMLElement>element.parentNode;
        if (parent.classList.contains(className)) {
            return parent;
        } else if (parent.tagName.toLowerCase() !== 'body') {
            return this.findParentByClassName(parent, className);
        }
    }

    /**
     * helps to determine if passed html element has scrollbar
     * @param element
     */
    static hasHorizontalScrollbar(element: HTMLElement) {
        if (!element) {
            return false;
        }
        return element.scrollHeight > element.clientHeight;
    }
}
