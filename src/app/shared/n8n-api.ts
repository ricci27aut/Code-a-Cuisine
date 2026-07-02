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

sendRecipeRequest() {
  const url = 'http://localhost:5678/webhook-test/recipe';

  const payload = {
    ingredients: this.recipeIngredients(),
    preferences: this.recipePreferences()
  };

  this.dataLoaded.set(false);

  this.http.post(url, payload).subscribe({
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