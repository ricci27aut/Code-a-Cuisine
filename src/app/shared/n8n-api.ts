import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class N8nApi {
private http = inject(HttpClient);
recipeRequest = signal<any[]>([]);

sendRecipeRequest() {
this.http.post('http://localhost:5678/webhook-test/recipe', this.recipeRequest()
).subscribe({
  next: (res) => console.log(res),
  error: (err) => console.error(err)
});

}}
