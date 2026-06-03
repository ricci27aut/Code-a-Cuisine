import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class N8nApi {
recipeRequest = signal<any[]>([]);
}
