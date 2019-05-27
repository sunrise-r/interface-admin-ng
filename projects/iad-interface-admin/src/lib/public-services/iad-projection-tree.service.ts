import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IadConfigService} from 'iad-interface-admin/core';
import { PresentationTreeModel } from '../projection-tree/projection-tree.model';

@Injectable({
  providedIn: 'root'
})
export class IadProjectionTreeService {

  constructor(private http: HttpClient, private config: IadConfigService) { }

  request(url): Observable<PresentationTreeModel[]> {
    return this.http.get<PresentationTreeModel[]>(this.fromRoot(url), { observe: 'body' });
  }

  fromRoot(url: string): string {
    return this.config.getConfig().rootUrl + url;
  }
}
