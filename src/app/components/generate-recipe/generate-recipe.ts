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
  ingredients = inject(N8nApi).recipeIngredients;

  @ViewChild('ingred')
  ingred!: ElementRef<HTMLInputElement>;
  @ViewChild('quantity')
  quantity!: ElementRef<HTMLInputElement>;

  edit: boolean = false;
  editIndex: number = -1;
  appId = '8c17b6e0';
  appKey = 'c545e239398655ec212848edb542ce1b'
  ingredientInput: string = '';
  suggestions: string[] = [];
  ingriedents = signal<any[]>([]);
  selectUnit: string = 'gram';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getIngredientSuggestions() ;
  }

  addIngredient(): void {
    const ingred = this.ingred?.nativeElement?.value ?? '';
    const quantity = this.quantity?.nativeElement?.value || 100;;

    this.ingredients.update(arr => [...arr, { 'quantity': quantity, 'unit': this.selectUnit, 'name': ingred }]);

    this.clearInput()
    console.log(this.ingredients());
  }

  clearInput() {
    this.quantity.nativeElement.value = '';
    this.ingred.nativeElement.value = '';
  }

  deletItem(i: number) {
    this.ingredients().splice(i, 1)
  }

  editItem(i: number) {
    if (this.edit == false) {
      this.edit = true;
      this.editIndex = i;
    } else {
      this.edit = false;
      this.editIndex = -1;
    }
  }

  getIngredientSuggestions() {
    this.http.get<any>(
      'https://www.themealdb.com/api/json/v1/1/list.php?i=list'
    )
      .subscribe(res => {
        this.suggestions = res.meals.map(
          (x: any) => x.strIngredient
        );
        console.log(this.suggestions);
      });
  }

  getRightIngredient(input: string) {

    const result = this.suggestions.filter(item =>
      item.toLowerCase().includes(input.toLowerCase())
    ).slice(0, 3);

    this.ingriedents.set(result);
  }

  addToInput(item: string) {
    this.ingred.nativeElement.value = item;
    this.ingriedents.set([]);
  }

  updateUnit(unit: string, index: number) {
    this.ingredients.update(items => {
      items[index].unit = unit;
      return [...items];
    });
  }

   updateQuantity(quantity: string, index: number) {
    this.ingredients.update(items => {
      items[index].quantity = quantity;
      return [...items];
    });
  }
}


