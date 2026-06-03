import { TestBed } from '@angular/core/testing';

import { N8nApi } from './n8n-api';

describe('N8nApi', () => {
  let service: N8nApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(N8nApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
