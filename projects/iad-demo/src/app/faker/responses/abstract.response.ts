import {HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

export abstract class AbstractResponse {

  request: HttpRequest<any>;

  constructor(request: HttpRequest<any>) {
    this.request = request;
  }

  abstract get(): Observable<any>;
}
