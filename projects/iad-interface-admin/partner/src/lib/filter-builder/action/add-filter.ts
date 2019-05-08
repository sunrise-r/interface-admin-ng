/**
 * Классы реализующие этот интерфейс позволяют добавлять фильтр к запросу
 */
import { BuildQuery } from './build-query';
import { AddOption } from './add-option';

export interface AddFilter extends BuildQuery {
    addFilter(name: String, value: any, useWildCard?: boolean): AddOption;
}
