import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {IadPresentationInterface} from '../model/iad-interfaces';
import {HttpClient} from '@angular/common/http';
import {IadConfigService} from '../config.service';
import {IadPresentation} from '../model/iad-model';

@Injectable({
  providedIn: 'root'
})
export class PresentationLoadService {

  constructor(private http: HttpClient, private config: IadConfigService) { }

  findListPresentation(presentationName: string): Observable<IadPresentationInterface> {
    return this.innerFindPresentation(presentationName, 'partnercms/api/iad/presentation/' + presentationName);
  }

  findDataPresentation(presentationName: string): Observable<IadPresentationInterface> {
    return this.innerFindPresentation(presentationName, 'partnercms/api/iad/presentation/data/' + presentationName);
  }

  protected innerFindPresentation(presentationName: string, url: string): Observable<IadPresentationInterface> {
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
