import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { N8nApi } from '../../shared/n8n-api';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-preferences',
  imports: [CommonModule, RouterLink],
  templateUrl: './preferences.html',
  styleUrl: './preferences.scss',
})
export class Preferences {
  /** Provides access to the recipe request state and API methods. */
  ingredients = inject(N8nApi);

  /** Angular router used to navigate between application views. */
  router = inject(Router);

  /** Available cuisine options. */
  countries = ['German', 'Italie', 'India', 'Japanese', 'Fusion'];

  /** Available dietary preference options. */
  preferencs = ['Vegetarien', 'Vegan', 'Keto', 'No preferences']

  /** Number of people cooking the recipe. */
  persons: number = 1;

  /** Number of recipe portions. */
  portions: number = 1;

  /** Selected preparation-time option. */
  time: string = '';

  /** Selected cuisine option. */
  cuisine: string = '';

  /** Selected dietary preference. */
  diet: string = '';

  /** Indicates whether the preference form contains missing selections. */
  checked: boolean = false;

  /**
   * Increases the selected counter up to its maximum value.
   *
   * @param list Counter to increase.
   */
  countUp(list: 'persons' | 'portions'): void {
    if (this[list] >= 2) {
      return;
    }
    this[list] += 1;
  }

  /**
   * Decreases the selected counter down to its minimum value.
   *
   * @param list Counter to decrease.
   */
  countDown(list: 'persons' | 'portions'): void {
    if (this[list] == 1) {
      return
    }
    this[list] -= 1;
  }

  /**
   * Sets the selected cuisine.
   *
   * @param cuisine Cuisine selected by the user.
   */
  setCuisine(cuisine: string): void {
    this.cuisine = cuisine;
  }

  /**
   * Sets the selected preparation time.
   *
   * @param time Preparation-time option selected by the user.
   */
  setTime(time: string): void {
    this.time = time;
  }

  /**
   * Sets the selected dietary preference.
   *
   * @param diet Dietary option selected by the user.
   */
  setDiet(diet: string): void {
    this.diet = diet;
  }

  /** Validates the selected options before saving the preferences. */
  checkImput(): void {
    if (this.cuisine === '' || this.time === '' || this.diet === '') {
      this.checked = true;
      return
    }
    this.setPreferences()
  }

  /** Saves the preferences, requests recipes, and opens the results view. */
  setPreferences(): void {
    this.ingredients.recipePreferences.set({
      cuisine: this.cuisine,
      time: this.time,
      diet: this.diet,
      persons: this.persons,
      portions: this.portions
    });
    this.checked = false;
    this.ingredients.sendRecipeRequest();
    this.router.navigate(['/Results']);
  }

}
