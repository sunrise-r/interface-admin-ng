import { HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IFakeResponse {
    request: HttpRequest<any>;

    setRequest(request: HttpRequest<any>);

    getResponse(): Observable<HttpEvent<any>>;
}

export abstract class AbstractResponse implements IFakeResponse {

    request: HttpRequest<any>;

    setRequest(request: HttpRequest<any>) {
        this.request = request;
        return this;
    }

    abstract getResponse(): Observable<HttpEvent<any>>;
}
