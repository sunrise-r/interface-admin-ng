import { TestBed } from '@angular/core/testing';

import { ProjectionNameResolverService } from './projection-name-resolver.service';

describe('ProjectionNameResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectionNameResolverService = TestBed.get(ProjectionNameResolverService);
    expect(service).toBeTruthy();
  });
});
