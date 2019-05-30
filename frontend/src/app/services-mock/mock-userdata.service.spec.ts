import { TestBed } from '@angular/core/testing';

import { MockUserdataService } from './mock-userdata.service';

describe('MockUserdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockUserdataService = TestBed.get(MockUserdataService);
    expect(service).toBeTruthy();
  });
});
