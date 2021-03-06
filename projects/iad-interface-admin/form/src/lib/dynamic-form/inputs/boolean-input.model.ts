import { FormInput } from '../core/form-input.model';

export class BooleanInput extends FormInput<boolean> {
  controlType = 'boolean';

  constructor(options: {} = {}) {
    super(options);
    this.value = this.value === true;
  }
}
