import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

import {IadPresentationInterface} from '../model/iad-interfaces';
import {IadConfigService} from '../config.service';
import {IadPresentation} from '../model/iad-model';

@Injectable({
  providedIn: 'root'
})
export class IadPresentationLoadService {

  constructor(private http: HttpClient, private config: IadConfigService) { }

  request(presentationName: string, url: string): Observable<IadPresentationInterface> {
    if (!presentationName) {
      console.error('trying to load undefined presentation');
      return of(new IadPresentation());
    }
    return this.http.get<IadPresentationInterface>(this.fromRoot(url), { observe: 'body' });
  }

  private fromRoot(url: string): string {
    return this.config.getConfig().rootUrl + url;
  }
}
