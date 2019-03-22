import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DomHelperService {
    constructor() {}

    /**
     * Ищет рекурсивно родителя по классу CSS
     * @param element
     * @param className
     */
    findParentByClassName(element: HTMLElement, className: string): HTMLElement {
        const parent = <HTMLElement>element.parentNode;
        if (parent.classList.contains(className)) {
            return parent;
        } else if (parent.tagName.toLowerCase() !== 'body') {
            return this.findParentByClassName(parent, className);
        }
    }

    /**
     * Ищет рекурсивно родителя по имени ноды
     * @param element
     * @param tagName
     */
    findParentByTagName(element: HTMLElement, tagName: string): HTMLElement {
        const parent = <HTMLElement>element.parentNode;
        return parent.tagName.toLowerCase() === tagName.toLowerCase() ? parent : this.findParentByClassName(parent, tagName);
    }

    /**
     * Ищет первого потомка у текущего dom Объекта
     * @param element
     * @param condition
     */
    child(element: HTMLElement, condition?: string): HTMLElement {
        return condition ? element.querySelector(condition) : <HTMLElement>element.children[0];
    }

    /**
     * Ищет соседний элемент по имени тега
     * @param element
     * @param condition
     */
    sibling(element: HTMLElement, condition?: string): HTMLElement {
        const parent = <HTMLElement>element.parentNode;
        return this.child(parent, condition);
    }
}
