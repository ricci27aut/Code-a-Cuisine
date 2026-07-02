import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorHandler } from './error-handler';

describe('ErrorHandler', () => {
  let component: ErrorHandler;
  let fixture: ComponentFixture<ErrorHandler>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorHandler],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorHandler);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
