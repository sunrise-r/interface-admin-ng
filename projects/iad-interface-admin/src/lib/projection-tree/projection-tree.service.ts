import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PresentationTreeModel } from './projection-tree.model';
import { IadConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectionTreeService {

  constructor(private http: HttpClient, private config: IadConfigService) { }

  request(): Observable<PresentationTreeModel[]> {
    return this.http.get<PresentationTreeModel[]>(this.fromRoot('/api/projection-tree'), { observe: 'body' });
  }

  fromRoot(url: string): string {
    return this.config.getConfig().rootUrl + url;
  }
}
