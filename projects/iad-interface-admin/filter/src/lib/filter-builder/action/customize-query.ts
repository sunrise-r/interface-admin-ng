import { AddFilter } from './add-filter';
import { AddOption } from './add-option';
import { MergeQuery } from './merge-query';

export interface CustomizeQuery extends AddFilter, AddOption, MergeQuery {}
