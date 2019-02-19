import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionTreeComponent } from './projection-tree.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {PresentationTreeModel} from './projection-tree.model';
import {ProjectionTreeService} from './projection-tree.service';
import {IadConfigService} from '../config.service';
import {IadModuleConfigInterface} from '../config';
import { MenuItem } from 'primeng/api';

describe('ProjectionTreeComponent', () => {
  let component: ProjectionTreeComponent;
  let fixture: ComponentFixture<ProjectionTreeComponent>;
  let service: ProjectionTreeService;
  let configService: IadConfigService;
  let translateService: TranslateService;
  let presentation: PresentationTreeModel;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      declarations: [ProjectionTreeComponent],
      providers: [
        {
          provide: IadConfigService,
          useValue: new IadConfigService(<IadModuleConfigInterface>{
            defaultI18nLang: 'en',
            i18nEnabled: true
          })
        }
      ]
    })
      .overrideTemplate(ProjectionTreeComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    configService = TestBed.get(IadConfigService);
    fixture = TestBed.createComponent(ProjectionTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = fixture.debugElement.injector.get(ProjectionTreeService);
    translateService = fixture.debugElement.injector.get(TranslateService);

    presentation = new PresentationTreeModel();
    presentation.code = 'fooPresentation';
    presentation.label = 'translate.fooPresentation.label';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Can not use it to test ngOnInit()
  // it('Should call load all on init', () => {
  //   const menuItem = <MenuItem>{
  //     label: 'translation',
  //     items: null
  //   };
  //
  //   spyOn(service, 'request').and.returnValue(
  //     of([presentation])
  //   );
  //
  //   spyOn(translateService, 'get').and.returnValue(
  //     of({
  //       'translate.fooPresentation.label': 'translation'
  //     })
  //   );
  //
  //   spyOn(component, 'convert').and.returnValue(
  //     Promise.resolve([menuItem])
  //   );
  //
  //   // WHEN
  //   component.ngOnInit();
  //
  //   // THEN
  //   expect(service.request).toHaveBeenCalled();
  //   // expect(component.items[0]).toEqual(jasmine.objectContaining({label: 'translation'}));
  // });

  it('should load presentation tree', () => {
    spyOn(service, 'request').and.returnValue(
      of([presentation])
    );

    component.loadAll().then(items => {
      expect(items).toEqual([presentation]);
    });

    expect(service.request).toHaveBeenCalled();
  });

  it('should translate presentation tree', () => {
    spyOn(translateService, 'get').and.returnValue(
      of({
        'translate.fooPresentation.label': 'translation'
      })
    );

    component.translate([presentation]).then(items => {
      expect(items[0]).toEqual(jasmine.objectContaining({ label: 'translation' }));
    });
  });

  it('should convert presentation tree to MenuModel tree', () => {
    component.convert([presentation]).then(items => {
      expect(items[0]).toEqual(jasmine.objectContaining({ label: 'translate.fooPresentation.label' }));
    });
  });
});
