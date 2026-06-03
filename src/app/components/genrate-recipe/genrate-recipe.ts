import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { N8nApi } from '../../shared/n8n-api';

@Component({
  selector: 'app-genrate-recipe',
  imports: [CommonModule, RouterLink],
  templateUrl: './genrate-recipe.html',
  styleUrl: './genrate-recipe.scss',
})
export class GenrateRecipe {
  ingredients = inject(N8nApi).recipeRequest;

  @ViewChild('ingred')
  ingred!: ElementRef<HTMLInputElement>;
  @ViewChild('quantity')
  quantity!: ElementRef<HTMLInputElement>;

  showNectBtn = false;


  addIngredient(): void {
    const ingred = this.ingred?.nativeElement?.value ?? '';
    const quantity = this.quantity?.nativeElement?.value || 100;;

    this.ingredients.update(arr => [...arr, { quantity, ingred }]);

    this.clearInput()
    this.showBtn()
    console.log(this.ingredients());
  }

  clearInput() {
    this.quantity.nativeElement.value = '';
    this.ingred.nativeElement.value = '';
  }

  deletItem(i: number) {
    this.ingredients().splice(i, 1)
    this.showBtn();
  }

  showBtn() {
    if (this.ingredients().length > 0) {
      this.showNectBtn = true;
    }
    if (this.ingredients().length == 0) {
      this.showNectBtn = false;
    }
  }
}
