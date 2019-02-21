import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionGridComponent } from './projection-grid.component';

describe('ProjectionGridComponent', () => {
  let component: ProjectionGridComponent;
  let fixture: ComponentFixture<ProjectionGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectionGridComponent ]
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
