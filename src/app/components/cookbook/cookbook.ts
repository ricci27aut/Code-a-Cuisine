import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router'
import { CommonModule } from '@angular/common';
import { FierbaseCookbook } from '../../shared/fierbase-cookbook'

@Component({
  selector: 'app-cookbook',
  imports: [RouterLink, CommonModule],
  templateUrl: './cookbook.html',
  styleUrl: './cookbook.scss',
})
export class Cookbook {
  imageNames: string[] = [
    'Italian', 'German', 'Japanese', 'Gourmet', 'Indian', 'Fusion'
  ];

  router = inject(Router);
  recipes =  inject(FierbaseCookbook)

  async loadCuisineRecipes(cuisine:string) {
    await this.router.navigate(['/ITRecipes', cuisine]);
  }
}
