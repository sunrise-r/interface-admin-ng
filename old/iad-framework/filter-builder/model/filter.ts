import { QuerySource } from './query-source';

export class Filter implements QuerySource {
    constructor(public field: String, public value: any, public useWildCard?: boolean) {}

    public toQueryPart(): String {
        return this.field + '=' + this.value + (this.useWildCard !== false ? '*' : '');
    }
}
