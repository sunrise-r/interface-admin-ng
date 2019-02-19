import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionTreeComponent } from './projection-tree.component';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {PresentationTreeModel} from './projection-tree.model';
import {ProjectionTreeService} from './projection-tree.service';
import {IadConfigService} from '../config.service';

describe('ProjectionTreeComponent', () => {
  let component: ProjectionTreeComponent;
  let fixture: ComponentFixture<ProjectionTreeComponent>;
  let service: ProjectionTreeService;
  let configService: IadConfigService;
  let translateService: TranslateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [ProjectionTreeComponent],
      providers: [
        {
          provide: IadConfigService,
          useValue: new IadConfigService({
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
    translateService = TestBed.get(TranslateService);
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
    presentation.label = 'translate.fooPresentation.label';

    spyOn(translateService, 'get').and.returnValue(
      of(
        {
            'translate.fooPresentation.label': 'translation'
          }
      )
    );

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
    expect(translateService.get).toHaveBeenCalled();
    expect(component.items[0]).toEqual(jasmine.objectContaining({ label: 'translation' }));
  });
});
