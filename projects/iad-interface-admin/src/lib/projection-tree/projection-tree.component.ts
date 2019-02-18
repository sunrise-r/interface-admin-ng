import { Component, OnInit } from '@angular/core';
import {ProjectionTreeService} from './projection-tree.service';
import {PresentationTreeModel} from './projection-tree.model';

@Component({
  selector: 'iad-projection-tree',
  templateUrl: './projection-tree.component.html',
  styleUrls: ['./projection-tree.component.css']
})
export class ProjectionTreeComponent implements OnInit {
  items: PresentationTreeModel[];

  constructor(private projectionTreeService: ProjectionTreeService) { }

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.projectionTreeService.request()
      .toPromise()
      .then((items: PresentationTreeModel[]) => {
        this.items = items;
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
