import { TestBed } from '@angular/core/testing';

import { ArrayupdaterService } from './arrayupdater.service';

describe('ArrayupdaterService', () => {
  let service: ArrayupdaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArrayupdaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
