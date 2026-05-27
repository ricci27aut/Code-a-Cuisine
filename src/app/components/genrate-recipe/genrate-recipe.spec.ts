import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenrateRecipe } from './genrate-recipe';

describe('GenrateRecipe', () => {
  let component: GenrateRecipe;
  let fixture: ComponentFixture<GenrateRecipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenrateRecipe],
    }).compileComponents();

    fixture = TestBed.createComponent(GenrateRecipe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
