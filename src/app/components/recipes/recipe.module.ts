import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
// import { BrowserModule } from "@angular/platform-browser";
// import { ShortenName } from "src/app/common/pipes/shorten-name.pipe";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesComponent } from "./recipes.component";
import { RecipeRoutingModule } from "./recipe-routing.module";
import { SharedModule } from "src/app/common/shared.module";
// import { BrowserModule } from "@angular/platform-browser";
// import { RouterModule } from "@angular/router";


@NgModule({
    declarations: [
        RecipesComponent,
        RecipeDetailComponent,
        RecipeListComponent,
        RecipeEditComponent,
        RecipeItemComponent,
        // ShortenName,
    ],
    imports: [
        // BrowserModule,
        ReactiveFormsModule,
        CommonModule,
        RecipeRoutingModule,
        // RouterModule,
        SharedModule
    ],
    exports: [
        // ShortenName,
    ]
})
export class RecipeModule{ }