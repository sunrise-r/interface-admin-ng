import { AddFilter } from './add-filter';
import { CustomizeQuery } from './customize-query';

export interface AddOption extends AddFilter {
    addOption(delegate: string, action: string, field: string): CustomizeQuery;

    addOption(delegate: string, action: string): CustomizeQuery;

    addOption(delegate: string): CustomizeQuery;
}
