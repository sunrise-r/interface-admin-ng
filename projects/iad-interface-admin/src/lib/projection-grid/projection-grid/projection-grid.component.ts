import {Component, Input, OnInit} from '@angular/core';
import {DocumentListProjection} from '../model/projection-grid.model';

@Component({
  selector: 'iad-projection-grid',
  templateUrl: './projection-grid.component.html',
  styleUrls: ['./projection-grid.component.scss']
})
export class ProjectionGridComponent implements OnInit {

  @Input() hasToolbar: boolean;

  /**
   * current projection
   */
  private _projection: DocumentListProjection;

  @Input()
  get projection(): DocumentListProjection {
    return this._projection;
  }
  set projection(projection: DocumentListProjection) {
    this._projection = projection;
  }

  constructor() { }

  ngOnInit() {
  }

}
