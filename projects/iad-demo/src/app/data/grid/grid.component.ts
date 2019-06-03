import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  IadGridColumn,
  IadListProjectionInterface,
  IadPresentation,
  PROJECTION_TYPE,
  ProjectionsHelper
} from 'iad-interface-admin';
import {Subscription} from 'rxjs';

@Component({
  selector: 'iad-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  columns: IadGridColumn[];

  projection: IadListProjectionInterface;

  presentationCode: string;

  routerSubscription: Subscription;

  @ViewChild('iadProjectionGrid')
  iadProjectionGrid: any;

  constructor(private route: ActivatedRoute, private router: Router) { }

  update() {
    this.iadProjectionGrid.doRefresh.next();
  }

  ngOnInit() {
      this.routerSubscription = this.route.data.subscribe(data => {
        const presentation: IadPresentation = data.presentation;
        this.presentationCode = data.presentation.code;
        // Actually we have only one list projection to show and it's name is 'main';
        // And we don't need projectionCode for this case
        this.projection = <IadListProjectionInterface>ProjectionsHelper
          .filterProjections(presentation, PROJECTION_TYPE.LIST)
          .find(_projection => _projection.code === 'main');

        this.columns = this.projection.columns;
      });
  }

}
