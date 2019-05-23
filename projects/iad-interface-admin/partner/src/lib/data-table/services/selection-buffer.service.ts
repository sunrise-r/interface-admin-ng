import { Injectable } from '@angular/core';

import { ActualSelectionModel } from '../models/actual-selection.model';
import { Subject } from 'rxjs';
import {DataBufferService} from './data-buffer.service';
import {StringHelper} from '../../shared/helpers/string.helper';

@Injectable({
    providedIn: 'root'
})
export class SelectionBufferService {
    dataUpdated: Subject<ActualSelectionModel> = new Subject<ActualSelectionModel>();

    constructor(private dataBuffer: DataBufferService) {}

    init(event) {
        this.dataBuffer.setData('selection', event);
        this.dataUpdated.next(this.getSelection());
    }

    getSelection(): ActualSelectionModel {
        return <ActualSelectionModel>this.dataBuffer.getData('selection');
    }

    getSelectionIndex() {
        return this.getSelection().selection;
    }

    getDTO() {
        return this.getSelection().documentDTO;
    }

    getProperties() {
        return this.getSelection() ? this.getSelection().properties : null;
    }

    getProperty(name: string) {
        return this.getProperties() ? this.getProperties()[name] : null;
    }

    getIndex() {
        return this.getSelection().documentIndex;
    }

    concat() {
        return Object.assign({}, this.getDTO(), this.getSelectionIndex(), this.getIndex(), this.getProperties());
    }

    getClassName(): string {
        const className: string = this.getProperties() ? this.getProperties().className : null;
        return className ? StringHelper.parseDotPathLastSection(className) : null;
    }

    clean() {
        this.dataBuffer.cleanData('selection');
    }
}
