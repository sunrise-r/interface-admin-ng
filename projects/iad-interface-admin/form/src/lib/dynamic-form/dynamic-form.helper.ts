import { FormatNameInterface, FormatValueInterface, FormInput } from './core/form-input.model';

export class DynamicFormHelper {
    /**
     * Возвращает название инпута формы
     * @param input
     */
    static formatInputName(input: FormInput<any>): any {
        return 'formatName' in input ? (<FormatNameInterface>input).formatName() : input.key;
    }

    /**
     * Возвращает значение по умолчанию для инпута формы
     * @param input
     */
    static formatInputValue(input: FormInput<any>): any {
        let value = 'formatValue' in input ? (<FormatValueInterface>input).formatValue() : input.value;
        if (value === undefined) {
          value = null;
        }
        return value;
    }

    /**
     * Возвращает true, если входящий параметр содержит children
     * @param input
     */
    static isFormInputGroup(input: any): boolean {
        return 'children' in input;
    }
}
