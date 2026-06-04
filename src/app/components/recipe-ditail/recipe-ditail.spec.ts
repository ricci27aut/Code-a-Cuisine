import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDitail } from './recipe-ditail';

describe('RecipeDitail', () => {
  let component: RecipeDitail;
  let fixture: ComponentFixture<RecipeDitail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeDitail],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeDitail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
