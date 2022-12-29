import { TestBed } from '@angular/core/testing';

import { MemberCrudService } from '../service/member-crud.service';

describe('MemberCrudService', () => {
  let service: MemberCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
