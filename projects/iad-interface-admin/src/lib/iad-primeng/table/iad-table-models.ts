import {FilterMetadata, SortMeta} from 'primeng/api';

export interface ResizeEvent {
  frozenLeft: string;
  frozenRight?: string;
  central?: string;
}

export interface LazyLoadData {
  first: number;
  rows: number;
  sortField: string;
  sortOrder: number;
  filters: {
    [s: string]: FilterMetadata;
  };
  globalFilter: any,
  multiSortMeta: SortMeta[],
  clearData: boolean;
}
