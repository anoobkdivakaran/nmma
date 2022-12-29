import { TestBed } from '@angular/core/testing';

import { ExpenceCrudService } from './expence-crud.service';

describe('ExpenceCrudService', () => {
  let service: ExpenceCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpenceCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
