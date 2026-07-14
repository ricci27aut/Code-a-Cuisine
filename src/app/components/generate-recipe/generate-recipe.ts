import { Component, inject, ViewChild, ElementRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { N8nApi } from '../../shared/n8n-api';
import { HttpClient } from '@angular/common/http';
import { DropDown } from '../drop-down/drop-down';

@Component({
  selector: 'app-generate-recipe',
  imports: [CommonModule, RouterLink, DropDown],
  templateUrl: './generate-recipe.html',
  styleUrl: './generate-recipe.scss',
})
export class GenrateRecipe {
  /** Stores the ingredients selected for the recipe request. */
  ingredients = inject(N8nApi).recipeIngredients;

  /** Reference to the ingredient input element. */
  @ViewChild('ingred')
  ingred!: ElementRef<HTMLInputElement>;

  /** Reference to the quantity input element. */
  @ViewChild('quantity')
  quantity!: ElementRef<HTMLInputElement>;

  /** Indicates whether an ingredient is currently being edited. */
  edit: boolean = false;

  /** Index of the ingredient currently being edited. */
  editIndex: number = -1;

  /** Application identifier used by the ingredient service. */
  appId = '8c17b6e0';

  /** Application key used by the ingredient service. */
  appKey = 'c545e239398655ec212848edb542ce1b'

  /** Current ingredient search input. */
  ingredientInput: string = '';

  /** Available ingredient name suggestions. */
  suggestions: string[] = [];

  /** Filtered ingredient suggestions displayed to the user. */
  ingriedents = signal<any[]>([]);

  /** Unit selected for newly added ingredients. */
  selectUnit: string = 'gram';

  /**
   * Creates the component with an HTTP client for loading ingredient data.
   *
   * @param http Angular HTTP client.
   */
  constructor(private http: HttpClient) { }

  /** Loads the available ingredient suggestions when the component initializes. */
  ngOnInit(): void {
    this.getIngredientSuggestions();
  }

  /** Adds the entered ingredient and quantity to the recipe request. */
  addIngredient(): void {
    const ingred = this.ingred?.nativeElement?.value ?? '';
    const quantity = this.quantity?.nativeElement?.value || 100;;

    this.ingredients.update(arr => [...arr, { 'quantity': quantity, 'unit': this.selectUnit, 'name': ingred }]);

    this.clearInput()
  }

  /** Clears the ingredient and quantity input elements. */
  clearInput(): void {
    this.quantity.nativeElement.value = '';
    this.ingred.nativeElement.value = '';
  }

  /**
   * Removes an ingredient at the specified index.
   *
   * @param i Index of the ingredient to remove.
   */
  deletItem(i: number): void {
    this.ingredients().splice(i, 1)
  }

  /**
   * Toggles the editing state for an ingredient.
   *
   * @param i Index of the ingredient to edit.
   */
  editItem(i: number): void {
    if (this.edit == false) {
      this.edit = true;
      this.editIndex = i;
    } else {
      this.edit = false;
      this.editIndex = -1;
    }
  }

  /** Loads ingredient name suggestions from the external meal API. */
  getIngredientSuggestions(): void {
    this.http.get<any>(
      'https://www.themealdb.com/api/json/v1/1/list.php?i=list'
    )
      .subscribe(res => {
        this.suggestions = res.meals.map(
          (x: any) => x.strIngredient
        );
      });
  }

  /**
   * Filters ingredient suggestions using the current input.
   *
   * @param input Search value entered by the user.
   */
  getRightIngredient(input: string): void {
    const result = this.suggestions.filter(item =>
      item.toLowerCase().includes(input.toLowerCase())
    ).slice(0, 3);

    this.ingriedents.set(result);
  }

  /**
   * Copies a selected suggestion into the ingredient input.
   *
   * @param item Ingredient name to insert.
   */
  addToInput(item: string): void {
    this.ingred.nativeElement.value = item;
    this.ingriedents.set([]);
  }

  /**
   * Updates the unit of an existing ingredient.
   *
   * @param unit New measurement unit.
   * @param index Index of the ingredient to update.
   */
  updateUnit(unit: string, index: number): void {
    this.ingredients.update(items => {
      items[index].unit = unit;
      return [...items];
    });
  }

  /**
   * Updates the quantity of an existing ingredient.
   *
   * @param quantity New ingredient quantity.
   * @param index Index of the ingredient to update.
   */
  updateQuantity(quantity: string, index: number): void {
    this.ingredients.update(items => {
      items[index].quantity = quantity;
      return [...items];
    });
  }
}

