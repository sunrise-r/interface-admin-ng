import { TestBed } from '@angular/core/testing';

import { PresentationResolverService } from './presentation-resolver.service';

describe('PresentationResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PresentationResolverService = TestBed.get(PresentationResolverService);
    expect(service).toBeTruthy();
  });
});
