import { TestBed } from '@angular/core/testing';

import { BriefingDataService } from './briefing-data.service';

describe('BriefingDataService', () => {
  let service: BriefingDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BriefingDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
