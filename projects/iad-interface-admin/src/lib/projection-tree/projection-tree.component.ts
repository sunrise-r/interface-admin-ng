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
    const convertBind = this.convert.bind(this);
    const translateBind = this.translate.bind(this);

    this.loadAll()
      .then(translateBind)
      .then(convertBind)
      .then(items  => {
        this.items = items;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  loadAll(): Promise<PresentationTreeModel[]> {
    return this.projectionTreeService.request().toPromise();
  }

  convert(items: PresentationTreeModel[]): Promise<MenuItem[]> {
    return Promise.resolve(items.map(presentation => {
      const item = <MenuItem>{};
      item.label = presentation.label;
      item.items = !presentation.projections ? null : presentation.projections.map(projection => {
        return <MenuItem>{
          label: projection.label,
          routerLink: projection.routerLink
        };
      });
      return item;
    }));
  }

  translate(items: PresentationTreeModel[]): Promise<PresentationTreeModel[]> {
    const translateLabels: string[] = [];
    items.forEach(presentation => {
      translateLabels.push(presentation.label);
      if (presentation.projections) {
        presentation.projections.forEach(projection => {
          translateLabels.push(projection.label);
        });
      }
    });
    return this.translateService
      .get(translateLabels)
      .toPromise()
      .then(labels => {
        return items.map(presentation => {
          presentation.label = labels[presentation.label];
          if (presentation.projections) {
            presentation.projections = presentation.projections.map(projection => {
              projection.label = labels[projection.label];
              return projection;
            });
          }
          return presentation;
        });
      });
  }
}
