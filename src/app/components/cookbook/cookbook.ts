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
  /** Names of the cuisine categories displayed in the cookbook. */
  imageNames: string[] = [
    'Italian', 'German', 'Japanese', 'Gourmet', 'Indian', 'Fusion'
  ];

  /** Indicates whether the cuisine list is currently being dragged. */
  isDragging = false;

  /** Horizontal pointer position at the start of a drag action. */
  startX = 0;

  /** Horizontal scroll position at the start of a drag action. */
  scrollLeft = 0;

  /** Angular router used to navigate between application views. */
  router = inject(Router);

  /** Provides access to recipes and Firebase operations. */
  recipes = inject(FierbaseCookbook)

  /**
   * Opens the recipe view for the selected cuisine.
   *
   * @param cuisine Cuisine category to load.
   */
  async loadCuisineRecipes(cuisine: string): Promise<void> {
    await this.router.navigate(['/ITRecipes', cuisine]);
  }

  /**
   * Starts horizontal dragging and records the initial positions.
   *
   * @param event Mouse event that started the drag action.
   */
  startDrag(event: MouseEvent): void {
    const element = event.currentTarget as HTMLElement;

    this.isDragging = true;
    this.startX = event.pageX - element.offsetLeft;
    this.scrollLeft = element.scrollLeft;
  }

  /**
   * Updates the horizontal scroll position during dragging.
   *
   * @param event Current mouse movement event.
   */
  onDrag(event: MouseEvent): void {
    if (!this.isDragging) return;

    const element = event.currentTarget as HTMLElement;
    const x = event.pageX - element.offsetLeft;
    const walk = x - this.startX;

    element.scrollLeft = this.scrollLeft - walk;
  }

  /** Stops the current drag action. */
  stopDrag(): void {
    this.isDragging = false;
  }
}
