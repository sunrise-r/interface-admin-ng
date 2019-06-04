import { TextInput } from './text-input.model';

export class TextInputTranslated extends TextInput {
    controlType = 'translateValue';
    translateValue = true;

    constructor(options: {} = {}) {
        super(options);
    }
}
