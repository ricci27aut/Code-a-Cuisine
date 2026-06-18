import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FierbaseCookbook } from '../../shared/fierbase-cookbook';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-ditail',
  imports: [CommonModule, RouterLink],
  templateUrl: './recipe-ditail.html',
  styleUrl: './recipe-ditail.scss',
})
export class RecipeDitail {
  route = inject(ActivatedRoute);
  service = inject(FierbaseCookbook);
  liked = 'assets/img/view/favorite.png'

  zahl= 2;

  timeCategory:string = 'Quick' 

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');

    if (name) {
      this.service.loadloadRecipesByName(name);
    }
    this.timeCategory = this.getTimeCategory()
  }

  getTimeCategory(): string {
    const minutes = this.service.recipeDitail()[0]?.cookingTime
  if (minutes <= 20) return 'Quick';
  if (minutes >= 21 && minutes <= 40 ) return 'Medium';
  if (minutes > 40) return 'Complex'
  return 'Complex';
}
}
