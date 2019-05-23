import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {IadPresentationInterface} from 'iad-interface-admin';
import {StringHelper} from 'iad-interface-admin/core';
import {PresentationLoadService} from '../services/presentation-load.service';

@Injectable({
  providedIn: 'root'
})
export class PresentationResolverService implements Resolve<IadPresentationInterface> {

  constructor(private presentationLoader: PresentationLoadService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IadPresentationInterface> {
    const presentationCode = route.params['presentationCode'] ? StringHelper.kebabToCamel(route.params['presentationCode'], false) : null;
    return this.presentationLoader.findPresentation(presentationCode);
  }
}
