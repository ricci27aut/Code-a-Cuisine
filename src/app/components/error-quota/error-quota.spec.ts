import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorQuota } from './error-quota';

describe('ErrorQuota', () => {
  let component: ErrorQuota;
  let fixture: ComponentFixture<ErrorQuota>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorQuota],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorQuota);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
