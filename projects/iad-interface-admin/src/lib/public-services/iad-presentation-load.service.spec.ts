import { TestBed } from '@angular/core/testing';

import { IadPresentationLoadService } from './presentation-load.service';

describe('PresentationLoadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IadPresentationLoadService = TestBed.get(IadPresentationLoadService);
    expect(service).toBeTruthy();
  });
});
