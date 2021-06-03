import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Ingredient } from 'src/app/common/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = []

  constructor(private slService: ShoppingListService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.slService.ingredientsChanged.subscribe(response => {
        this.ingredients = response
        console.log(response)
    })    
  }
  
  onEditIngredient(i: number) {
    this.slService.selectedIndex.next(i)
    this.router.navigate(['/shoppinglist/', i])
  }

}
