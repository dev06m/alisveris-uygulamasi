import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "src/app/auth/auth-guard.guard";
import { AuthGuardService } from "src/app/common/services/auth-guard.service";
import { SharedModule } from "src/app/common/shared.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        RouterModule.forChild([{
            path: '', 
            component: ShoppingListComponent, 
            canActivate: [AuthGuard],
            canLoad: [AuthGuardService]
        }]),
        SharedModule
    ],
    exports: [RouterModule]
})
export class ShoppingListModule{}