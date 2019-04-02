import {Injectable} from '@angular/core';
import {NumberInput} from './number-input.model';
import {DateInput} from './date-input.model';
import {TextInput} from './text-input.model';
import {HiddenInput} from './hidden-input.model';
import {FileInput} from './file-input.model';
import {DateTimeInput} from './date-time-input.model';
import {TextareaInput} from './textarea-input.model';
import {FormInput} from './form-input.model';

const typeFactory = {
    BigDecimal: NumberInput,
    Boolean: TextInput, // Text until checkbox/radio
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
