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
  ingredients = inject(N8nApi);
  router = inject(Router);
  countries = ['German', 'Italie', 'India', 'Japanese', 'Fusion'];
  preferencs = ['Vegetarien', 'Vegan', 'Keto', 'No preferences']
  persons: number = 1;
  portions: number = 1;

  time: string = '';
  cuisine: string = '';
  diet: string = '';

  checked: boolean = false;

  countUp(list: 'persons' | 'portions'): void {
    if (this[list] >= 2) {
      return;
    }
    this[list] += 1;
  }

  countDown(list: 'persons' | 'portions'): void {
    if (this[list] == 1) {
      return
    }
    this[list] -= 1;
  }

  setCuisine(cuisine: string): void {
    this.cuisine = cuisine;
  }

  setTime(time: string): void {
    this.time = time;
  }
  setDiet(diet: string): void {
    this.diet = diet;
  }

  checkImput(): void {
    if (this.cuisine === '' || this.time === '' || this.diet === '') {
      this.checked = true;
      return
    }
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