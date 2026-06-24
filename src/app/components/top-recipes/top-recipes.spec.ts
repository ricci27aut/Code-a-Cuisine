import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRecipes } from './top-recipes';

describe('TopRecipes', () => {
  let component: TopRecipes;
  let fixture: ComponentFixture<TopRecipes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopRecipes],
    }).compileComponents();

    fixture = TestBed.createComponent(TopRecipes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
