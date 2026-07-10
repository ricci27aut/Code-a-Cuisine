import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class N8nApi {
  private http = inject(HttpClient);
  recipeIngredients = signal<any[]>([]);
  recipePreferences = signal<any>({});
  recipeResults = signal<any>([]);
  dataLoaded = signal(false);
  errorIngredients = signal(false);
  errorQuota = signal(false);
  url: string = 'http://localhost:5678/webhook/recipe';

  /**
   * Sends the current recipe request to the backend.
   *
   * The request contains the user's selected ingredients and recipe preferences.
   * While the request is being processed, the loading state is activated.
   *
   * On success:
   * - Stores the generated recipes.
   * - Updates the loading state.
   *
   * On error:
   * - Displays an ingredient validation error (HTTP 400).
   * - Displays a quota limit error when the daily request limit has been reached (HTTP 429).
   *
   * @returns {void}
   */
  sendRecipeRequest() {
    const payload = {
      ingredients: this.recipeIngredients(),
      preferences: this.recipePreferences()
    };

    this.dataLoaded.set(false);

    this.http.post(this.url, payload).subscribe({
      next: data => {
        this.recipeResults.set(data);
        this.dataLoaded.set(true);
      },
      error: error => {
        if (error.status === 400) {
          this.errorIngredients.set(true);
        } else if (error.status === 429) {
          this.errorQuota.set(true);
        }
      }
    });
  }
}