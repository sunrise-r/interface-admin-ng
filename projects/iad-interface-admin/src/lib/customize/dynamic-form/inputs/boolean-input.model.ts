import { FormInput } from './form-input.model';

export class BooleanInput extends FormInput<boolean> {
  controlType = 'boolean';

  constructor(options: {} = {}) {
    super(options);
  }
}
