import { FormInput } from '../core/form-input.model';

export class MultiSelectInputModel extends FormInput<string[]> {
  controlType = 'multiSelect';

  values: string[];
  maxSelectedLabels: number;
  showHeader: boolean;
  translatePrefix: string;

  constructor(options: {} = {}) {
    super(options);
    this.values = options['values'];
    this.maxSelectedLabels = options['maxSelectedLabels'] || 3;
    this.showHeader = options['showHeader'] === undefined ? true : options['showHeader'];
    this.translatePrefix = options['translatePrefix'];
  }
}
