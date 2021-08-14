import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipeEditComponent } from '../components/recipes/recipe-edit/recipe-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnasavedChangesGuard implements CanDeactivate<unknown> {

  canDeactivate(
    component: RecipeEditComponent):  boolean  {

    //   if (component.form.dirty) {
    //     return confirm('Kaydedilmemis verileriniz kaybolacak, yinede devam etmek istiyor musunuz?');
    //   }
    return true;
  }
  
}
