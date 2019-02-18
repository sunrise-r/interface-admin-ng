import { TestBed } from '@angular/core/testing';

import { ProjectionTreeService } from './projection-tree.service';

describe('ProjectionTreeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectionTreeService = TestBed.get(ProjectionTreeService);
    expect(service).toBeTruthy();
  });
});
