import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FierbaseCookbook } from '../../shared/fierbase-cookbook';

@Component({
  selector: 'app-recipe-ditail',
  imports: [CommonModule],
  templateUrl: './recipe-ditail.html',
  styleUrl: './recipe-ditail.scss',
})
export class RecipeDitail {
  route = inject(ActivatedRoute);
  service = inject(FierbaseCookbook);
  liked = 'assets/img/view/favorite.png'

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');

    if (name) {
      this.service.loadloadRecipesByName(name);
    }
  }
}
