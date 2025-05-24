import { TestBed } from '@angular/core/testing';

import { TransactionStreamService } from './transaction-stream.service';

describe('TransactionStreamService', () => {
  let service: TransactionStreamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionStreamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
