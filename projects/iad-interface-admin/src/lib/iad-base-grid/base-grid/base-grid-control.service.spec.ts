import { TestBed } from '@angular/core/testing';

import { BaseGridControlService } from './base-grid-control.service';

describe('IadGridControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseGridControlService = TestBed.get(BaseGridControlService);
    expect(service).toBeTruthy();
  });
});
