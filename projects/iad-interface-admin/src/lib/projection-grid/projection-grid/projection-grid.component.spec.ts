import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionGridComponent } from './projection-grid.component';
import {IadScrollableViewComponent, IadTableComponent} from '../../iad-primeng';
import {TableColumnSizeDirective} from '../table-column-size/table-column-size.directive';
import {TableColumnFilterComponent} from '../table-column-filter/table-column-filter.component';
import {TableSortIconComponent} from '../table-sort-icon/table-sort-icon.component';
import {BooleanPipe} from '../../shared/pipes/boolean.pipe';
import {MomentPipe} from '../../shared/pipes/moment.pipe';
import {SelectableRow, SortableColumn} from 'primeng/table';
import {DropdownModule, Paginator} from 'primeng/primeng';
import {IadTableBodyComponent} from '../../iad-primeng/table/iad-table-body.component';
import {IadSharedModule} from '../../shared';

describe('ProjectionGridComponent', () => {
  let component: ProjectionGridComponent;
  let fixture: ComponentFixture<ProjectionGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProjectionGridComponent,
        IadTableComponent,
        TableColumnSizeDirective,
        TableColumnFilterComponent,
        TableSortIconComponent,
        Paginator,
        SelectableRow,
        SortableColumn,
        IadTableBodyComponent,
        IadScrollableViewComponent ],
      imports: [
        IadSharedModule,
        DropdownModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
