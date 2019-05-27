import { FormInput } from './form-input.model';

export class ChipsInputModel extends FormInput<string[]> {
  controlType = 'chips';

  values: string[];

  constructor(options: any = {}) {
    super(options);
    this.values = options.value;
  }
}
