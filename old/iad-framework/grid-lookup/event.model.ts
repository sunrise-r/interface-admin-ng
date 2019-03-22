import { DocumentListProjection, IProjectionDefaultFilter } from '../';

export const onLookupAdd = 'onLookupAdd';
export interface LookupAdd {
    name: string;
    content: {
        lookupSourceEventName: string;
        presentationCode: string;
        projection: DocumentListProjection;
        sourceItems: any[];
        filter: IProjectionDefaultFilter[];
        showFilter: boolean;
        context: any;
    };
}

export const onLookupSelect = 'onLookupSelect';
export interface LookupSelect {
    name: string;
    content: any;
}
