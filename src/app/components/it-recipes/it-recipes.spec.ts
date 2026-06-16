import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ITRecipes } from './it-recipes';

describe('ITRecipes', () => {
  let component: ITRecipes;
  let fixture: ComponentFixture<ITRecipes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ITRecipes],
    }).compileComponents();

    fixture = TestBed.createComponent(ITRecipes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
