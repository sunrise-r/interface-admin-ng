import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {IadConfigService} from 'iad-interface-admin/core';

import { IadProjectionTreeService } from './iad-projection-tree.service';
import {PresentationTreeModel} from '../projection-tree/projection-tree.model';

describe('ProjectionTreeService', () => {
  let injector: TestBed;
  let service: IadProjectionTreeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IadConfigService]
    });
    injector = getTestBed();
    service = injector.get(IadProjectionTreeService);
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
