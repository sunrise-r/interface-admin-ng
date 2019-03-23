import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PresentationTreeModel } from '../projection-tree/projection-tree.model';
import { IadConfigService } from '../config.service';

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
