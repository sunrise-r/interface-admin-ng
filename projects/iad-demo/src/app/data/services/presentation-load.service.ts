import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {IadPresentationInterface, IadPresentationLoadService} from 'iad-interface-admin';

@Injectable({
  providedIn: 'root'
})
export class PresentationLoadService {

  constructor(private iadPresentationLoadService: IadPresentationLoadService) { }

  findListPresentation(presentationName: string): Observable<IadPresentationInterface> {
    return this.iadPresentationLoadService.request(presentationName, 'partnercms/api/iad/presentation/' + presentationName);
  }

  findDataPresentation(presentationName: string): Observable<IadPresentationInterface> {
    return this.iadPresentationLoadService.request(presentationName, 'partnercms/api/iad/presentation/data/' + presentationName);
  }

}
