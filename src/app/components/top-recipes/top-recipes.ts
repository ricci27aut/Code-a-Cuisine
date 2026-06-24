import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FierbaseCookbook } from '../../shared/fierbase-cookbook'

@Component({
  selector: 'app-top-recipes',
  imports: [CommonModule],
  templateUrl: './top-recipes.html',
  styleUrl: './top-recipes.scss',
})
export class TopRecipes {
  topRecipes = signal<any[]>([]);
  service = inject(FierbaseCookbook);

  ngOnInit() {
    this.service.getTopRecipes().subscribe(data => {

      const recipes = data
        ? Object.entries(data).map(([id, recipe]: any) => ({
          id,
          ...recipe
        }))
        : [];

      recipes.sort((a, b) => (b.likes || 0) - (a.likes || 0));

      this.topRecipes.set(recipes.slice(0, 5));
        console.log(this.topRecipes());
    });
  }
}