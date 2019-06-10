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
        this.projection = <IadListProjectionInterface>ProjectionsHelper
          .filterProjections(presentation, PROJECTION_TYPE.LIST)
          .find(_projection => _projection.code === data.projectionCode);

        this.columns = this.projection.columns;
      });
  }

}
