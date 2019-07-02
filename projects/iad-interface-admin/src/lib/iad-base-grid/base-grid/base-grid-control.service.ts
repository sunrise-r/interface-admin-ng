import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { share } from 'rxjs/operators';

/**
 * Please provide it only in grid component!
 */
@Injectable()
export class BaseGridControlService {

    observable: Observable<any>;
    observer: Observer<any>;

    set table(table: any) {
        this._table = table;
        if (this.observer != null) {
            this.observer.next(table);
        }
    }

    private _table: any;

    constructor() {
        this.observable = Observable.create((observer: Observer<any>) => {
            this.observer = observer;
        }).pipe(share());
    }

    getTable(): Promise<any> {
        return this.observable.toPromise();
    }

}
