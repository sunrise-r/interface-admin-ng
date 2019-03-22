import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable({
    providedIn: 'root'
})
export class FilterCommunicationService {
    private subject = new Subject<any>();

    sendMessage(query: any) {
        this.subject.next({ query });
    }

    getMessage(): Observable<string> {
        return this.subject.asObservable();
    }
}
