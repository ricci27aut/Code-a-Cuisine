import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FierbaseCookbook } from '../../shared/fierbase-cookbook';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-it-recipes',
  imports: [CommonModule, RouterLink],
  templateUrl: './it-recipes.html',
  styleUrl: './it-recipes.scss',
})
export class ITRecipes {
  /** Provides access to recipes and Firebase operations. */
  service = inject(FierbaseCookbook);

  /** Provides access to the parameters of the currently active route. */
  route = inject(ActivatedRoute);

  /** Current pagination page. */
  pagination: number = 1;

  /** Total number of available pages. */
  pages: number = 30;

  /** Maximum number of recipes displayed on each page. */
  itemsPerPage: number = 20;

  /** Index of the first recipe displayed on the current page. */
  startIndex: number = 0;

  /** Exclusive index after the last recipe displayed on the current page. */
  endIndex: number = 20;

  cuisine:string = 'Italian';

  /** Creates an effect that recalculates the number of pages when recipe data changes. */
  constructor() {
    effect(() => {
      this.howManyPages();
    });
  }

  /** Loads recipes for the category specified in the current route. */
  ngOnInit(): void {
    this.cuisine = this.route.snapshot.paramMap.get('category') || 'Italian';

    if (this.cuisine) {
      this.service.loadRecipesByCategory(this.cuisine);
    }
  }

  /**
   * Changes the current page and updates the displayed recipe range.
   *
   * @param page Page number to display.
   */
  changePage(page: number): void {
    if (page < 1 || page > this.pages) return;

    this.pagination = page;
    this.startIndex = (page - 1) * this.itemsPerPage;
    this.endIndex = page * this.itemsPerPage;
  }

  /** Calculates the number of pages from the available recipes. */
  howManyPages(): void {
    let array = this.service.recipes().length;

    this.pages = Math.max(1, Math.ceil(array / this.itemsPerPage));

    if (this.pagination > this.pages) {
      this.changePage(this.pages);
    }
  }
}
