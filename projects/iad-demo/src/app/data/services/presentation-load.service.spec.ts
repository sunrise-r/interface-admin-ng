import { TestBed } from '@angular/core/testing';

import { PresentationLoadService } from './presentation-load.service';

describe('PresentationLoadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PresentationLoadService = TestBed.get(PresentationLoadService);
    expect(service).toBeTruthy();
  });
});
