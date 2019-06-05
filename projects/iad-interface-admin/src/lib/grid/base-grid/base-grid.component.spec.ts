import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseGridComponent } from './base-grid.component';

describe('GridComponent', () => {
  let component: BaseGridComponent;
  let fixture: ComponentFixture<BaseGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
