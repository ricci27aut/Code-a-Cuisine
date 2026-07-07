import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FierbaseCookbook {
  /** Base URL of the Firebase Realtime Database. */
  private firebaseUrl = 'https://code-a-cuisine-26bde-default-rtdb.europe-west1.firebasedatabase.app';

  /** Stores the recipes loaded for a selected category. */
  recipes = signal<any[]>([]);

  /** Stores the details of the currently selected recipe. */
  recipeDitail = signal<any[]>([]);

  /**
   * Creates the service with an HTTP client for Firebase requests.
   *
   * @param http Angular HTTP client.
   */
  constructor(private http: HttpClient) { }

  /**
   * Requests recipes belonging to a specific category.
   *
   * @param category Category used to filter the recipes.
   * @returns An observable containing the matching Firebase entries.
   */
  getRecipesByCategory(category: string): Observable<any> {
    return this.http.get<any>(
      `${this.firebaseUrl}/recipes.json?orderBy="category"&equalTo="${category}"`
    );
  }

  /**
   * Requests a recipe with a specific name.
   *
   * @param name Recipe name used for the Firebase query.
   * @returns An observable containing the matching Firebase entry.
   */
  getRecipeByName(name: string): Observable<any> {
    return this.http.get<any>(
      `${this.firebaseUrl}/recipes.json?orderBy="name"&equalTo="${name}"`
    );
  }

  /**
   * Loads recipes for a category and stores them in the recipes signal.
   *
   * @param category Category whose recipes should be loaded.
   */
  loadRecipesByCategory(category: string): void {
    this.getRecipesByCategory(category).subscribe(data => {
      const recipesArray = data
        ? Object.entries(data).map(([id, recipe]: any) => ({
          id,
          ...recipe
        }))
        : [];

      this.recipes.set(recipesArray);
    });
  }

  /**
   * Loads a recipe by name and stores its details in the recipe detail signal.
   *
   * @param name Name of the recipe to load.
   */
  loadloadRecipesByName(name: string): void {
    this.getRecipeByName(name).subscribe(data => {
      const recipesArray = data
        ? Object.entries(data).map(([id, recipe]: any) => ({
          id,
          ...recipe
        }))
        : [];
      this.recipeDitail.set(recipesArray);
    })
  }

  /**
   * Increases the like count of a recipe in Firebase.
   *
   * @param name Name of the recipe to like.
   */
  likeRecipe(name: string): void {
    this.getRecipeByName(name).subscribe(data => {
      const entry = Object.entries(data)[0] as any;
      const id = entry[0];
      const recipe = entry[1];

      const newLikes = (recipe.likes || 0) + 1;

      this.http.patch(`${this.firebaseUrl}/recipes/${id}.json`, {
        likes: newLikes
      }).subscribe();
    });
  }

  /**
   * Decreases the like count of a recipe in Firebase.
   *
   * @param name Name of the recipe to unlike.
   */
  unlikeRecipe(name: string): void {
    this.getRecipeByName(name).subscribe(data => {
      const entry = Object.entries(data)[0] as any;
      const id = entry[0];
      const recipe = entry[1];

      const newLikes = (recipe.likes || 0) - 1;

      this.http.patch(`${this.firebaseUrl}/recipes/${id}.json`, {
        likes: newLikes
      }).subscribe();
    });

  }

  /**
   * Requests all recipes used to determine the top recipes.
   *
   * @returns An observable containing all Firebase recipes.
   */
  getTopRecipes(): Observable<any> {
  return this.http.get<any>(`${this.firebaseUrl}/recipes.json`);
}
}
