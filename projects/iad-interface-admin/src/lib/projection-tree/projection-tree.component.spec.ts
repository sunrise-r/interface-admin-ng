import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionTreeComponent } from './projection-tree.component';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {PresentationTreeModel} from './projection-tree.model';
import {ProjectionTreeService} from './projection-tree.service';

describe('ProjectionTreeComponent', () => {
  let component: ProjectionTreeComponent;
  let fixture: ComponentFixture<ProjectionTreeComponent>;
  let service = ProjectionTreeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectionTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = fixture.debugElement.injector.get(ProjectionTreeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should load presentation tree', () => {

    const headers = new HttpHeaders().append('link', 'link;link');
    const presentation = new PresentationTreeModel();
    presentation.code = 'fooPresentation';
    spyOn(service, 'request').and.returnValue(
      of(
        new HttpResponse({
          body: [presentation],
          headers
        })
      )
    );

    // WHEN
    component.ngOnInit();

    // THEN
    expect(service.request).toHaveBeenCalled();
    expect(component.items[0]).toEqual(jasmine.objectContaining({ code: 'fooPresentation' }));
  });
});
