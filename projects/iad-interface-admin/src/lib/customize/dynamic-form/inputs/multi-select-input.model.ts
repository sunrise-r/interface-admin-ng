import { FormInput } from './form-input.model';

export class MultiSelectInputModel extends FormInput<string[]> {
  controlType = 'multiSelect';

  values: string[];
  maxSelectedLabels: number;
  filter: boolean;
  translatePrefix: string;

  constructor(options: any = {}) {
    super(options);
    this.values = options.values;
    this.maxSelectedLabels = options.maxSelectedLabels || 3;
    this.filter = options.filter === undefined ? true : options.filter;
    this.translatePrefix = options.translatePrefix;
  }
}
