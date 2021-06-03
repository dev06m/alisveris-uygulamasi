import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Ingredient } from "src/app/common/ingredient.model";

@Injectable({
    providedIn: 'root'
})
export class ShoppingListService{
    
    ingredientsChanged = new Subject<Ingredient[]>(); // bu observable

    selectedIndex = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient("nane", 5),
        new Ingredient("marul", 2)
        ]

    getIngredients() {
        return this.ingredients.slice();
    }

    addNewIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);

        this.ingredientsChanged.next(this.ingredients.slice()); // bu da next() fonksiyonu
    }

    getSingleIngredient(index: number) : Ingredient {
        return this.ingredients[index]
    }

    updateIngredient(index:number, name: string, amount: number) {
        this.ingredients[index].name = name 
        this.ingredients[index].amount = amount
        this.ingredientsChanged.next(this.ingredients);
    }

    deleteIngredient(index) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients);
    }   


}