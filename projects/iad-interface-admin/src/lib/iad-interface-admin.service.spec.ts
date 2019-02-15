import { TestBed } from '@angular/core/testing';

import { IadInterfaceAdminService } from './iad-interface-admin.service';

describe('IadInterfaceAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IadInterfaceAdminService = TestBed.get(IadInterfaceAdminService);
    expect(service).toBeTruthy();
  });
});
