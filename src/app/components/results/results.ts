import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { N8nApi } from '../../shared/n8n-api';
import { Router } from '@angular/router';
import { ErrorHandler } from '../error-handler/error-handler'
import { ErrorQuota } from '../error-quota/error-quota';

@Component({
  selector: 'app-results',
  imports: [CommonModule, ErrorHandler, ErrorQuota],
  templateUrl: './results.html',
  styleUrl: './results.scss',
})
export class Results {
recipes = inject(N8nApi);
router = inject(Router);

loadView(){
  this.router.navigate(['/View']);
}
}
