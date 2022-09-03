import { TestBed } from '@angular/core/testing';

import { CLientLocationsService } from './client-locations.service';

describe('CLientLocationsService', () => {
  let service: CLientLocationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CLientLocationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
