import { TestBed } from '@angular/core/testing';

import { IadGridControlService } from './iad-grid-control.service';

describe('IadGridControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IadGridControlService = TestBed.get(IadGridControlService);
    expect(service).toBeTruthy();
  });
});
