import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { N8nApi } from '../../shared/n8n-api';

@Component({
  selector: 'app-error-handler',
  imports: [RouterLink],
  templateUrl: './error-handler.html',
  styleUrl: './error-handler.scss',
})
export class ErrorHandler {
  service = inject(N8nApi);

/* reset the error states */
  resetErrors() {
    this.service.errorIngredients.set(false);
    this.service.errorQuota.set(false);
  }
}
