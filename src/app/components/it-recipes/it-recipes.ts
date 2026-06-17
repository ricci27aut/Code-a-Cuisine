import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FierbaseCookbook } from '../../shared/fierbase-cookbook';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-it-recipes',
  imports: [CommonModule, RouterLink ],
  templateUrl: './it-recipes.html',
  styleUrl: './it-recipes.scss',
})
export class ITRecipes {
  service = inject(FierbaseCookbook);
  route = inject(ActivatedRoute);

  pagination: number = 1;
  pages: number = 30;
  itemsPerPage: number = 20;

  startIndex: number = 0;
  endIndex: number = 20;

  constructor() {
    effect(() => {
      this.howManyPages();
    });
  }

  ngOnInit() {
    const category = this.route.snapshot.paramMap.get('category');

    if (category) {
      this.service.loadRecipesByCategory(category);
    }
  }

 changePage(page: number) {
  if (page < 1 || page > this.pages) return;

  this.pagination = page;
  this.startIndex = (page - 1) * this.itemsPerPage;
  this.endIndex = page * this.itemsPerPage;
}

 howManyPages() {
  let array = this.service.recipes().length;

  this.pages = Math.max(1, Math.ceil(array / this.itemsPerPage));

  if (this.pagination > this.pages) {
    this.changePage(this.pages);
  }
}
}
