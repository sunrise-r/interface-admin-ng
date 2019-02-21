import {AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList, TemplateRef} from '@angular/core';
import {DocumentListProjection} from '../model/projection-grid.model';
import {IadGridColumn} from '../model/iad-grid-column.model';
import {PrimeTemplate} from 'primeng/shared';
import {Subject} from 'rxjs';

@Component({
  selector: 'iad-projection-grid',
  templateUrl: './projection-grid.component.html',
  styleUrls: ['./projection-grid.component.scss']
})
export class ProjectionGridComponent implements OnInit, AfterContentInit {

  /**
   * Projection table columns
   */
  @Input() columns: IadGridColumn[];

  /**
   * Table has toolbar right above the header
   */
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

  /**
   * Flag to add 'responsive' css class
   */
  @Input() responsive: boolean;

  /**
   * Flag to check if grid filter should be shown
   */
  @Input() showFilter: boolean;

  /**
   * Projection table values
   */
  @Input() value: any[] = [];

  /**
   * PrimeNg Table templates
   */
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;

  /**
   * Templates for every column type in format {key: value}
   */
  colTemplates: { [param: string]: TemplateRef<any> } = {};

  /**
   * Throws filter reset event
   */
  resetFilter: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.templates.forEach(item => {
      this.colTemplates[item.getType()] = item.template;
    });
  }

  /**
   * Filter event handler
   */
  onFilter(event: any, col: any) {
    // this.dt.filters = {};
    // this.dt.filter(event.value, col.field, col.filterMatchMode);
    // this.refresh();
  }

}
