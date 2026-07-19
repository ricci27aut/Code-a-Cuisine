import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FierbaseCookbook } from '../../shared/fierbase-cookbook'
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-top-recipes',
  imports: [CommonModule, RouterModule],
  templateUrl: './top-recipes.html',
  styleUrl: './top-recipes.scss',
})
export class TopRecipes {
  /** Stores the five recipes with the highest number of likes. */
  topRecipes = signal<any[]>([]);

  /** Provides access to the cookbook data stored in Firebase. */
  service = inject(FierbaseCookbook);

  /** Loads, sorts, and stores the five most-liked recipes on initialization. */
  ngOnInit(): void {
    this.service.getTopRecipes().subscribe(data => {

      const recipes = data
        ? Object.entries(data).map(([id, recipe]: any) => ({
          id,
          ...recipe
        })).filter(recipe => (recipe.likes || 0) > 0)
        : [];

      recipes.sort((a, b) => (b.likes || 0) - (a.likes || 0));

      this.topRecipes.set(recipes.slice(0, 5));
    });
  }
}
