import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { RecipeService } from "../../components/recipes/recipe.service";
import { Recipe } from "../recipe.model";

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
        //     recipes = res
        //     if (recipes.length === 0) {
        //         return this.recipeService.getRecipes().subscribe();
        //     }
        //     return recipes;
        // });
        // return recipes;
    }


}