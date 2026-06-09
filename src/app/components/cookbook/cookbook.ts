import { Component, } from '@angular/core';
import { RouterLink } from '@angular/router'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cookbook',
  imports: [RouterLink, CommonModule],
  templateUrl: './cookbook.html',
  styleUrl: './cookbook.scss',
})
export class Cookbook {
  imageNames: string[] = [
    'Italian', 'German', 'Japanese', 'Gourmet', 'Indian', 'Fusion'
  ];
}
