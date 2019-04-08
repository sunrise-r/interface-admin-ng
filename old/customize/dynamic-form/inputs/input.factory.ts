import { Injectable } from '@angular/core';

import { DateInput, NumberInput, TextInput, HiddenInput, FileInput, FormInput, DateTimeInput, TextareaInput, BooleanInput } from '../';

const typeFactory = {
    BigDecimal: NumberInput,
    Boolean: BooleanInput,
    Integer: NumberInput,
    ZonedDateTime: DateInput,
    String: TextInput,
    Hidden: HiddenInput,
    File: FileInput,
    SplittedDateTime: DateTimeInput,
    Text: TextareaInput
};

@Injectable({
    providedIn: 'root'
})
export class InputFactory {
    typeFactory: { [prop: string]: any };

    initTypeFactory(extendTypeFactory: { [prop: string]: any } = {}) {
        this.typeFactory = Object.assign({}, typeFactory, extendTypeFactory);
        return this;
    }

    createInput(type: string, options: any): FormInput<any> {
        return this.typeFactory[type] ? new this.typeFactory[type](options) : new TextInput(options);
    }
}
