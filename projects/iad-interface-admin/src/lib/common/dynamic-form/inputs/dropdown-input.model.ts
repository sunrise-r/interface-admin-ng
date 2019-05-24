import { FormInput } from './form-input.model';

export class DropdownInputModel extends FormInput<string[]> {
  controlType = 'dropdown';

  values: string[];
  maxSelectedLabels: number;
  showHeader: boolean;
  translatePrefix: string;
  valuesUrl: string;

  constructor(options: any = {}) {
    super(options);
    this.values = options.values;
    this.maxSelectedLabels = options.maxSelectedLabels || 3;
    this.showHeader = options.showHeader === undefined ? true : options.showHeader;
    this.translatePrefix = options.translatePrefix;
    this.valuesUrl = options.valuesUrl;
    this.value = options.value;
  }
}
