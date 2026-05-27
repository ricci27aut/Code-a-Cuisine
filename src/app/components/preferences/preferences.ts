import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preferences',
  imports: [CommonModule],
  templateUrl: './preferences.html',
  styleUrl: './preferences.scss',
})
export class Preferences {
  countries = ['German', 'Italie', 'India', 'Japanese', 'Fusion'];
  preferencs = ['Vegetarien', 'Vegan', 'Keto', 'No preferences']
  persons: number = 1;
  portions: number = 1;

  countUp(list: 'persons' | 'portions'): void {
    if (this[list] >= 8) {
      return;
    }
    this[list] += 1;
  }

  countDown(list: 'persons' | 'portions'): void {
    if (this[list] == 1) {
      return
    }
    this[list] -= 1;
  }
}
