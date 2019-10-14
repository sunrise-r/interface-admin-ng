import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IadPresentationInterface } from 'iad-interface-admin';
import { IadPresentationLoadService } from './iad-presentation-load.service';

@Injectable({
  providedIn: 'root'
})
export class PresentationLoadService {

  constructor(private iadPresentationLoadService: IadPresentationLoadService) { }

  findPresentation(presentationName: string): Observable<IadPresentationInterface> {
    return this.iadPresentationLoadService.request(presentationName, 'iad/presentation/' + presentationName);
  }

  findDataPresentation(presentationName: string): Observable<IadPresentationInterface> {
    return this.iadPresentationLoadService.request(presentationName, 'iad/presentation/data/' + presentationName);
  }

}
