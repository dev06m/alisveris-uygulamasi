import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";


import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinner } from "./loading-spinner/loading-spinner";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ShortenName } from "./pipes/shorten-name.pipe";
import { UrlValidator } from "./pipes/url-validator.pipe";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinner,
        NotFoundComponent,
        ShortenName,
        UrlValidator
    ],
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [
        AlertComponent,
        LoadingSpinner,
        NotFoundComponent,
        ShortenName,
        UrlValidator,
        TranslateModule
    ]
})
export class SharedModule {}


export function httpTranslateLoader(http:HttpClient) {
    return new TranslateHttpLoader(http);
  }