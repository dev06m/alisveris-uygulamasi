import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ingredient } from 'src/app/common/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [ShoppingListService]
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = []

  constructor(private slService: ShoppingListService,
              private router: Router) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.slService.ingredientsChanged.subscribe(response => {
        this.ingredients = response
    })    
  }
  
  onEditIngredient(i: number) {
    this.slService.selectedIndex.next(i)
  }

  goPipes() {
    // this.router.navigate();
    this.router.navigate(['/pipes/1/2'])
  }

}
