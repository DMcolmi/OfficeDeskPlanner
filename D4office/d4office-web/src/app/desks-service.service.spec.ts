import { TestBed } from '@angular/core/testing';

import { DesksServiceService } from './desks-service.service';

describe('DesksServiceService', () => {
  let service: DesksServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesksServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
