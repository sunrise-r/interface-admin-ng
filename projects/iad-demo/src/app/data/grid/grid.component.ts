import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {IadGridColumn, IadPresentation} from 'iad-interface-admin';
import {Subscription} from 'rxjs';
import {ProjectionsHelper, IadListProjectionInterrface, PROJECTION_TYPE} from 'iad-interface-admin';

@Component({
  selector: 'iad-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  columns: IadGridColumn[];

  projection: IadListProjectionInterrface;

  routerSubscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
      this.routerSubscription = this.route.data.subscribe(data => {
        const presentation: IadPresentation = data.presentation;
        // const projectionCode = data.projectionCode;
        // Actually we have only one list projection to show and it's name is 'main';
        // And we don't need projectionCode for this case
        this.projection = <IadListProjectionInterrface>ProjectionsHelper
          .filterProjections(presentation, PROJECTION_TYPE.LIST)
          .find(_projection => _projection.code === 'main');

        this.columns = this.projection.columns;
      });
  }

}
