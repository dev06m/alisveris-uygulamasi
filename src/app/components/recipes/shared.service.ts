import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from 'src/app/common/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  //  // Observable string sources
  //  private emitChangeSource = new Subject<Recipe>();
  //  private recipeIndexSource = new Subject<number>();
  //  // Observable string streams
  //  changeEmitted$ = this.emitChangeSource.asObservable();
  //  changeIndex$ = this.recipeIndexSource.asObservable();
  //  // Service message commands
  //  emitChange(change: Recipe) {
  //      this.emitChangeSource.next(change);
  //  }

  //  emitIndexChange(change: number) {
  //   this.recipeIndexSource.next(change);
  //  }


}
