import { Filter } from './filter';
import { Option } from './option';

export class BuilderRaw {
    constructor(public filters: Filter[] = [], public options: Option[] = []) {}
}
