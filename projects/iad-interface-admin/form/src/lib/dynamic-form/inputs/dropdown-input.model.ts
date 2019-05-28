import { FormInput } from '../core/form-input.model';

export class DropdownInputModel extends FormInput<string> {
  controlType = 'dropdown';

  values: string[];
  translatePrefix: string;
  valuesUrl: string;

  constructor(options: {} = {}) {
    super(options);
    this.values = options['values'];
    this.translatePrefix = options['translatePrefix'];
    this.valuesUrl = options['valuesUrl'];
    this.value = options['value'];
  }
}
