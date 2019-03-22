import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {IadPresentationInterface, StringHelper, PresentationLoadService} from 'iad-interface-admin';

@Injectable({
  providedIn: 'root'
})
export class PresentationResolverService implements Resolve<IadPresentationInterface> {

  constructor(private presentationLoader: PresentationLoadService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IadPresentationInterface> | Promise<IadPresentationInterface> | IadPresentationInterface {
    const presentationCode = route.params['presentationCode'] ? StringHelper.kebabToCamel(route.params['presentationCode'], false) : null;
    return this.presentationLoader.findListPresentation(presentationCode);
  }
}
