import { DropdownInputModel } from './dropdown-input.model';

/**
 * Note! Prefer DropdownInputModel instead
 */
export class DropdownMultiInputModel extends DropdownInputModel {
    constructor(options: {} = {}) {
        super(options);
        this.multiple = true;
    }
}
