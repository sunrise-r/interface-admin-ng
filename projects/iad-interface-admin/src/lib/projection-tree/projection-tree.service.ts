import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PresentationTreeModel } from './projection-tree.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectionTreeService {

  constructor(private http: HttpClient) { }

  request(): Observable<PresentationTreeModel[]> {
    return this.http.get<PresentationTreeModel[]>('/api/projection-tree', { observe: 'body' });
  }
}
