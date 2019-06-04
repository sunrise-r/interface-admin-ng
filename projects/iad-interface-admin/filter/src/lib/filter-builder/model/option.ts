import { QuerySource } from './query-source';

export class Option implements QuerySource {
    public action: String;

    public field: String;

    public delegate: String;

    toQueryPart(): String {
        return 'option=' + (this.field || 'null') + ',' + (this.delegate || 'null') + ',' + (this.action || 'null');
    }
}
