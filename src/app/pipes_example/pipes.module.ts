import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../common/shared.module";
import { PipesComponent } from "./pipes/pipes.component";

@NgModule({
    imports: [
        RouterModule.forChild([{path: '', component: PipesComponent, 
        // canActivate: [AuthGuard]
        }]),
        SharedModule
    ],
    exports: [RouterModule]
})
export class PipesModule{}