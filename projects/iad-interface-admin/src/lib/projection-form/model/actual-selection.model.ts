export enum SELECT_ACTION {
    SELECT = 'select',
    UNSELECT = 'unselect'
}

export class ActualSelectionModel {
    action: SELECT_ACTION;
    documentDTO?: any;
    documentIndex?: any;
    properties?: any;
    referenceDocuments?: any;
    type?: string;
    selection?: any;
}

export const onActualSelection = 'onActualSelection';
export class ActualSelectionEvent {
    public name: string;
    constructor(public content?: ActualSelectionModel) {
        this.name = onActualSelection;
    }
}
