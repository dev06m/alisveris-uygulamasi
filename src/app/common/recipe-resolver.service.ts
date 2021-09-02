import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { RecipeService } from "../components/recipes/recipe.service";
import { Recipe } from "./recipe.model";

@Injectable({
    providedIn: 'root'
})
export class RecipeResolver implements Resolve<Recipe[]>{

    constructor(private recipeService: RecipeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        // let recipes: Recipe[] = [];

        // const recipes = this.recipeService.getRecipes();
        // if (recipes.)
        return  this.recipeService.getRecipes();
        //     res => {
        //     console.log('res: ', res)
        //     recipes = res
        //     if (recipes.length === 0) {
        //         console.log('1: ', recipes)
        //         return this.recipeService.getRecipes().subscribe();
        //     }
        //     console.log('2: ', recipes)
        //     return recipes;
        // });
        // console.log('3: ', recipes)
        // return recipes;
    }


}