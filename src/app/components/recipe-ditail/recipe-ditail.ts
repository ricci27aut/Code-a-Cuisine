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
  name = this.route.snapshot.paramMap.get('name');

  zahl= 2;
  path = 'assets/img/view/Heart.png'
  isLiked:boolean = false;
  like:number = 0;

  timeCategory:string = 'Quick' 

  ngOnInit() {

    if (this.name) {
      this.service.loadloadRecipesByName(this.name);
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

  likeTheRecipe() {
    if (!this.isLiked) {
      this.path = 'assets/img/view/Hart-full.png';
      this.isLiked = true;
      this.like = 1;
      this.service.likeRecipe(this.name?? '');
    }else{
      this.path = 'assets/img/view/Heart.png';
      this.isLiked = false;
      this.like = 0;
      this.service.unlikeRecipe(this.name?? '');
    }

}

}