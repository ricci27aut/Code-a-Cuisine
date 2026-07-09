import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { N8nApi } from '../../shared/n8n-api';

@Component({
  selector: 'app-error-quota',
  imports: [RouterLink],
  templateUrl: './error-quota.html',
  styleUrl: './error-quota.scss',
})
export class ErrorQuota {
    service = inject(N8nApi);


/* reset the error states */
   resetErrors() {
    this.service.errorIngredients.set(false);
    this.service.errorQuota.set(false);
  }
}
