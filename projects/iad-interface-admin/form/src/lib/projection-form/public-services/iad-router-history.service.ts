import {Injectable} from '@angular/core';
import {NavigationEnd, Router, Event} from '@angular/router';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IadRouterHistoryService {
  private _previousUrl: string;
  private currentUrl;
  private subscription: any;

  constructor(private router: Router) {
    this.currentUrl = router.url;
    this.subscription = router.events.pipe(filter((event: Event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this._previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      });
  }

  get previousUrl(): string {
    return this._previousUrl;
  }
}
