import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { SharedModule } from '../common/shared.module';
// import { LoadingSpinner } from '../components/loading-spinner/loading-spinner';

@NgModule({
  declarations: [
    AuthComponent,
    // LoadingSpinner
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: AuthComponent }]),
    // SharedModule
    SharedModule 
  ],
  exports: [RouterModule]
})
export class AuthModule {}
