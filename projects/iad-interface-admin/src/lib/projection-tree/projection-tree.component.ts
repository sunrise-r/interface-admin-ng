import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';

import {ProjectionTreeService} from './projection-tree.service';
import {PresentationTreeModel} from './projection-tree.model';

@Component({
  selector: 'iad-projection-tree',
  template: `<p-panelMenu *ngIf="items" [model]="items"></p-panelMenu>`
})
export class ProjectionTreeComponent implements OnInit {
  items: MenuItem[];

  constructor(public projectionTreeService: ProjectionTreeService, public translateService: TranslateService) { }

  ngOnInit() {
    this.loadAll();
  }

  private loadAll() {
    this.projectionTreeService.request()
      .toPromise()
      .then(this.translate.bind(this))
      .then((items: PresentationTreeModel[]) => {
        this.items = this.convert(items);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  private convert(items: PresentationTreeModel[]) {
    return items.map(presentation => {
      const item = <MenuItem>{};
      item.label = presentation.label;
      item.items = !presentation.projections ? null : presentation.projections.map(projection => {
        return <MenuItem>{
          label: projection.label,
          url: projection.url
          // routerLink?: any;
        };
      });
      return item;
    });
  }

  private translate(items: PresentationTreeModel[]): Promise<PresentationTreeModel[]> {
    const translateLabels: string[] = [];
    items.forEach(presentation => {
      translateLabels.push(presentation.label);
      presentation.projections.forEach(projection => {
        translateLabels.push(projection.label);
      });
    });
    return this.translateService
      .get(translateLabels)
      .toPromise()
      .then(labels => {
        return items.map(presentation => {
          presentation.label = labels[presentation.label];
          presentation.projections = presentation.projections.map(projection => {
            projection.label = labels[projection.label];
            return projection;
          });
          return presentation;
        });
      });
  }
}
