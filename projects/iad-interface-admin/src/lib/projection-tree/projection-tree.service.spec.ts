import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProjectionTreeService } from './projection-tree.service';
import {PresentationTreeModel} from './projection-tree.model';

describe('ProjectionTreeService', () => {
  let injector: TestBed;
  let service: ProjectionTreeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    injector = getTestBed();
    service = injector.get(ProjectionTreeService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return a list of Presentations', () => {
    const presentation = new PresentationTreeModel();
    presentation.code = 'fooPresentation';

    service.request().subscribe(received => {
      expect(received[0].code).toEqual('fooPresentation');
    });

    const req = httpMock.expectOne({ method: 'GET' });
    req.flush([presentation]);
  });
});
