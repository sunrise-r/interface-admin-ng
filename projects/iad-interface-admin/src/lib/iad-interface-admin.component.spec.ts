import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IadInterfaceAdminComponent } from './iad-interface-admin.component';

describe('IadInterfaceAdminComponent', () => {
  let component: IadInterfaceAdminComponent;
  let fixture: ComponentFixture<IadInterfaceAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IadInterfaceAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IadInterfaceAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
