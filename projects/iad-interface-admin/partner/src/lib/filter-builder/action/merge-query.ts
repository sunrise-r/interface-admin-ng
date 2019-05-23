/**
 * Классы реализующие этот интерфейс позволяют мерджить filters и options и получать raw информацию из builder
 */
import { BuildQuery } from './build-query';
import { CustomizeQuery } from './customize-query';
import { BuilderRaw } from '../model/raw';

export interface MergeQuery extends BuildQuery {
    raw(): BuilderRaw;

    merge(raw: BuilderRaw): CustomizeQuery;
}
