import {TextInput} from './text-input.model';

export class TextInputTranslated extends TextInput {
  translateValue = true;

  constructor(options: {} = {}) {
    super(options);
  }
}
