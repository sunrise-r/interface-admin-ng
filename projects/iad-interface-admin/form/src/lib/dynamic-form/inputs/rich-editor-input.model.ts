import { FormInput } from '../core/form-input.model';

export class RichEditorInput extends FormInput<boolean> {
  controlType = 'rich';

  constructor(options: {} = {}) {
    super(options);
  }
}
