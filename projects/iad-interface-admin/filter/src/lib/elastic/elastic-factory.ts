import {ElasticSearchQueryBuilder} from './elastic-search-query.builder';

export class ElasticFactory {
  createFilter() {
    console.log('Direct usage of "query string query" builder may be unsafe');
    return new ElasticSearchQueryBuilder();
  }
}
