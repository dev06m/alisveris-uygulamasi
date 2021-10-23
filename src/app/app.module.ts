import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShadowDirective } from './common/shadow.directive';
import { PipesComponent } from './pipes_example/pipes/pipes.component';
import { PipePipe } from './pipes_example/pipe.pipe'; 
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorInterceptor } from './auth/auth-interceptor.interceptor';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShadowDirective,
    PipesComponent,
    PipePipe,
  ],
  imports: [
    BrowserModule, // this is angular library
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule, //this must be called last
  ],
  providers: [
      // {provide: HTTP_INTERCEPTORS, useClass: ExpInterceptorService, multi: true},
      {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  // exports: [LoadingSpinner]
})
export class AppModule { }


export function httpTranslateLoader(http:HttpClient) {
  return new TranslateHttpLoader(http);
}