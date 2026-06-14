import { Component, } from '@angular/core';
import { RouterLink } from '@angular/router'
import { CommonModule } from '@angular/common';
import { FierbaseCookbook } from '../../shared/fierbase-cookbook'

@Component({
  selector: 'app-cookbook',
  imports: [RouterLink, CommonModule, FierbaseCookbook],
  templateUrl: './cookbook.html',
  styleUrl: './cookbook.scss',
})
export class Cookbook {
  imageNames: string[] = [
    'Italian', 'German', 'Japanese', 'Gourmet', 'Indian', 'Fusion'
  ];

  constructor(private recipeFirebaseService: RecipeFirebaseService) { }

  recipes = this.recipeFirebaseService.recipes;

  loadItalianRecipes() {
    this.recipeFirebaseService.loadRecipesByCategory('Italian');
  }

  loadGermanRecipes() {
    this.recipeFirebaseService.loadRecipesByCategory('German');
  }

  loadJapaneseRecipes() {
    this.recipeFirebaseService.loadRecipesByCategory('Japanese');
  }
}
