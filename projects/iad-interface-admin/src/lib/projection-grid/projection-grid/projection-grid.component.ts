import {AfterContentInit, Component, ContentChildren, Input, OnChanges, OnInit, QueryList, SimpleChanges, TemplateRef} from '@angular/core';
import {PrimeTemplate} from 'primeng/shared';
import {Subject} from 'rxjs';

import {DocumentListProjection} from '../model/projection-grid.model';
import {IadGridColumn} from '../model/iad-grid-column.model';

@Component({
  selector: 'iad-projection-grid',
  templateUrl: './projection-grid.component.html',
  styleUrls: ['./projection-grid.component.scss']
})
export class ProjectionGridComponent implements OnInit, AfterContentInit, OnChanges {

  /**
   * #4 Add paginator to the table
   */
  @Input() paginator: boolean;

  /**
   * Projection table columns
   */
  @Input() columns: IadGridColumn[];

  /**
   * Table has toolbar right above the header
   */
  @Input() hasToolbar: boolean;

  /**
   * unique code to identify current presentation
   */
  @Input() presentationCode: string;

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
   * @todo check if we need it
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
   * @todo check if we need it
   * Throws filter reset event
   */
  resetFilter: Subject<boolean> = new Subject<boolean>();

  /**
   * Search url for grid-component
   */
  searchUrl: string;

  constructor() {}

  ngOnInit() {}

  ngAfterContentInit(): void {
    this.templates.forEach(item => {
      this.colTemplates[item.getType()] = item.template;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
      if ((changes['projection'] && this.projection) || (changes['presentationCode'] && this.presentationCode)) {
        // this.queryCallback = this.initQueryCallback.bind(this);
        // this.initColumns();
        // #issue 1249 we must load actualInfo if it is not false in loadActualInfo input
        // this.loadActualInfo = this.initLoadActualInformationFlag();
        // this.groupSettingsKey = this.settingsGroupName(this.projection.code);
        // this.unSelectRow.next(true);
        this.searchUrl = this.projection.searchUrl;
      }
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
