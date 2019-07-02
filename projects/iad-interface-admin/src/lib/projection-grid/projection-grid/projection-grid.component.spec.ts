import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionGridComponent } from './projection-grid.component';

import { SelectableRow, SortableColumn } from 'primeng/table';
import { DropdownModule, Paginator } from 'primeng/primeng';
import { IadTableBodyComponent, IadSharedModule, IadTableComponent, IadScrollableViewComponent } from 'iad-interface-admin/core';

describe('ProjectionGridComponent', () => {
    let component: ProjectionGridComponent;
    let fixture: ComponentFixture<ProjectionGridComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProjectionGridComponent,
                IadTableComponent,
                Paginator,
                SelectableRow,
                SortableColumn,
                IadTableBodyComponent,
                IadScrollableViewComponent],
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
