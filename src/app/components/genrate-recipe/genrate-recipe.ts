import { Component, signal, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-genrate-recipe',
  imports: [CommonModule,  RouterLink],
  templateUrl: './genrate-recipe.html',
  styleUrl: './genrate-recipe.scss',
})
export class GenrateRecipe {

  @ViewChild('ingred')
    ingred!: ElementRef<HTMLInputElement>;
  @ViewChild('quantity')
    quantity!: ElementRef<HTMLInputElement>;

  ingredients = signal<any[]>([]);


  addIngredient(): void {
    const ingred = this.ingred?.nativeElement?.value ?? '';
    const quantity = this.quantity?.nativeElement?.value ?? 100;;

    this.ingredients.update(arr => [...arr, { quantity, ingred }]);

    this.clearInput()
  }

clearInput(){
  this.quantity.nativeElement.value = '';
  this.ingred.nativeElement.value = '';
}

deletItem(i : number){
  this.ingredients().splice(i, 1)
  console.log(this.ingredients());
  
}
}
