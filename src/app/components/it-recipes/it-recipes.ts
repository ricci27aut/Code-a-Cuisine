import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FierbaseCookbook } from '../../shared/fierbase-cookbook';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-it-recipes',
  imports: [CommonModule],
  templateUrl: './it-recipes.html',
  styleUrl: './it-recipes.scss',
})
export class ITRecipes {
  service = inject(FierbaseCookbook);
  route = inject(ActivatedRoute);
  pagination: number = 1;
  Pager: number = 8
  Pages: number = 0

  startIndex: number = 0;
endIndex: number = 20;

  ngOnInit() {
    const category = this.route.snapshot.paramMap.get('category');

    if (category) {
      this.service.loadRecipesByCategory(category);
    }

    this.howManyPages()
  }

  changePage(page: number) {
    if (page >= this.Pages) return
    this.pagination = page;
  }

  howManyPages() {
    let array = this.service.recipes().length;
    this.Pages = array / 20

    if (this.Pages <= this.Pager) {
      this.Pager = this.Pages
    }
  }
}

