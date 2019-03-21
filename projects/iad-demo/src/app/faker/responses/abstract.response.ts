import {HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface IFakeResponse {
  request: HttpRequest<any>;
  getResponse(): Observable<HttpEvent<any>>;
}

export abstract class AbstractResponse implements IFakeResponse{

  request: HttpRequest<any>;

  constructor(request: HttpRequest<any>) {
    this.request = request;
  }

  abstract getResponse(): Observable<HttpEvent<any>>;
}
