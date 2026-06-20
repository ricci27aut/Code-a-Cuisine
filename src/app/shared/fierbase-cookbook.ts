import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FierbaseCookbook {
  private firebaseUrl = 'https://code-a-cuisine-26bde-default-rtdb.europe-west1.firebasedatabase.app';

  recipes = signal<any[]>([]);
  recipeDitail = signal<any[]>([]);

  constructor(private http: HttpClient) { }

  getRecipesByCategory(category: string) {
    return this.http.get<any>(
      `${this.firebaseUrl}/recipes.json?orderBy="category"&equalTo="${category}"`
    );
  }

  getRecipeByName(name: string) {
    return this.http.get<any>(
      `${this.firebaseUrl}/recipes.json?orderBy="name"&equalTo="${name}"`
    );
  }

  loadRecipesByCategory(category: string) {
    this.getRecipesByCategory(category).subscribe(data => {
      const recipesArray = data
        ? Object.entries(data).map(([id, recipe]: any) => ({
          id,
          ...recipe
        }))
        : [];

      this.recipes.set(recipesArray);
      console.log(recipesArray);

    });
  }

  loadloadRecipesByName(name: string) {
    this.getRecipeByName(name).subscribe(data => {
      const recipesArray = data
        ? Object.entries(data).map(([id, recipe]: any) => ({
          id,
          ...recipe
        }))
        : [];
      console.log(recipesArray);
      this.recipeDitail.set(recipesArray);
    })
  }

  likeRecipe(name: string) {
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

  unlikeRecipe(name: string) {
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
}
