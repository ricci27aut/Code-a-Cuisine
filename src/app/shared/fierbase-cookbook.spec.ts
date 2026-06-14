import { TestBed } from '@angular/core/testing';

import { FierbaseCookbook } from './fierbase-cookbook';

describe('FierbaseCookbook', () => {
  let service: FierbaseCookbook;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FierbaseCookbook);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
