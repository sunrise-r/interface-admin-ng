import { Injectable } from '@angular/core';

import { FormInput } from './form-input.model';
import { TextInput } from '../inputs/text-input.model';

import { inputModels } from '../form-input-map';

@Injectable({
    providedIn: 'root'
})
export class InputFactory {
    typeFactory: { [prop: string]: any };

    initTypeFactory(extendTypeFactory?: { [prop: string]: any }) {
        this.typeFactory = extendTypeFactory ? Object.assign({}, inputModels, extendTypeFactory) : inputModels;
        return this;
    }

    createInput(type: string, options: any): FormInput<any> {
        return this.typeFactory[type] ? new this.typeFactory[type](options) : new TextInput(options);
    }
}
