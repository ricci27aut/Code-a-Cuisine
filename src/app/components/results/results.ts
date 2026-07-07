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
  /** Provides access to the generated recipe results and related API state. */
  recipes = inject(N8nApi);

  /** Angular router used to navigate between application views. */
  router = inject(Router);

  /** Navigates to the detailed recipe view. */
  loadView(name: string, category: string): void {
    this.router.navigate([`/View/${category}/${name}`]);
  }
}
