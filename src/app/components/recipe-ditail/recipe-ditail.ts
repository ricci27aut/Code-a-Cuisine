import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FierbaseCookbook } from '../../shared/fierbase-cookbook';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-ditail',
  imports: [CommonModule, RouterLink],
  templateUrl: './recipe-ditail.html',
  styleUrl: './recipe-ditail.scss',
})
export class RecipeDitail {
  /** Provides access to the parameters of the currently active route. */
  route = inject(ActivatedRoute);

  /** Provides access to recipe data and Firebase operations. */
  service = inject(FierbaseCookbook);

  /** Path to the icon displayed next to the recipe's total number of likes. */
  liked = 'assets/img/view/favorite.png'

  /** Recipe name retrieved from the current route. */
  name = this.route.snapshot.paramMap.get('name');

  /** Stores a numeric value for the component. */
  zahl = 2;

  /** Path to the currently displayed like button icon. */
  path = 'assets/img/view/Heart.png'

  /** Indicates whether the current user has liked the recipe. */
  isLiked: boolean = false;

  /** Local adjustment applied to the displayed number of likes. */
  like: number = 0;

  /** Cooking-time category assigned to the current recipe. */
  timeCategory: string = 'Quick'

  /** Loads the selected recipe and determines its cooking-time category. */
  ngOnInit(): void {

    if (this.name) {
      this.service.loadloadRecipesByName(this.name);
    }
    this.timeCategory = this.getTimeCategory()
  }

  /**
   * Determines the recipe category based on its cooking time.
   *
   * @returns The matching cooking-time category.
   */
  getTimeCategory(): string {
    const minutes = this.service.recipeDitail()[0]?.cookingTime
    if (minutes <= 20) return 'Quick';
    if (minutes >= 21 && minutes <= 40) return 'Medium';
    if (minutes > 40) return 'Complex'
    return 'Complex';
  }

  /** Toggles the recipe's like state and updates it in Firebase. */
  likeTheRecipe(): void {
    if (!this.isLiked) {
      this.path = 'assets/img/view/Hart-full.png';
      this.isLiked = true;
      this.like = 1;
      this.service.likeRecipe(this.name ?? '');
    } else {
      this.path = 'assets/img/view/Heart.png';
      this.isLiked = false;
      this.like = 0;
      this.service.unlikeRecipe(this.name ?? '');
    }
  }

}
