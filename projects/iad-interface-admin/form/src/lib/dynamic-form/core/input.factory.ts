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
        this.typeFactory = this.mapModelKeysToLower(extendTypeFactory ? Object.assign({}, inputModels, extendTypeFactory) : inputModels);
        return this;
    }

    createInput(type: string, options: any): FormInput<any> {
        type = this.toLowerCamelCase(type);
        return this.typeFactory[type] ? new this.typeFactory[type](options) : new TextInput(options);
    }

    /**
     * Solution to make possible not worry about first letter case in form field display types
     * @param models
     */
    mapModelKeysToLower(models: {[p: string]: any}) {
        const resultModels: {[p: string]: any} = {};
        Object.keys(models).forEach(key => {
            resultModels[this.toLowerCamelCase(key)] = models[key];
        });
        return resultModels;
    }

    /**
     * Will make any string lowerCamelCase
     * @param str
     */
    toLowerCamelCase(str: string) {
        return str.charAt(0).toLowerCase() + str.substr(1, str.length - 1);
    }
}
