import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router'
import { CommonModule } from '@angular/common';
import { FierbaseCookbook } from '../../shared/fierbase-cookbook'
import { TopRecipes } from '../top-recipes/top-recipes';

@Component({
  selector: 'app-cookbook',
  imports: [RouterLink, CommonModule, TopRecipes],
  templateUrl: './cookbook.html',
  styleUrl: './cookbook.scss',
})
export class Cookbook {
  imageNames: string[] = [
    'Italian', 'German', 'Japanese', 'Gourmet', 'Indian', 'Fusion'
  ];

  isDragging = false;
startX = 0;
scrollLeft = 0;

  router = inject(Router);
  recipes =  inject(FierbaseCookbook)

  async loadCuisineRecipes(cuisine:string) {
    await this.router.navigate(['/ITRecipes', cuisine]);
  }

  startDrag(event: MouseEvent) {
  const element = event.currentTarget as HTMLElement;

  this.isDragging = true;
  this.startX = event.pageX - element.offsetLeft;
  this.scrollLeft = element.scrollLeft;
}

onDrag(event: MouseEvent) {
  if (!this.isDragging) return;

  const element = event.currentTarget as HTMLElement;
  const x = event.pageX - element.offsetLeft;
  const walk = x - this.startX;

  element.scrollLeft = this.scrollLeft - walk;
}

stopDrag() {
  this.isDragging = false;
}
}

