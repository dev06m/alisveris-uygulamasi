import { HttpClient } from "@angular/common/http";
import { Pipe, PipeTransform } from "@angular/core";
import { of } from "rxjs";
import { catchError, debounceTime } from "rxjs/operators";

@Pipe({
    name : "urlValidate"   
})
export class UrlValidator implements PipeTransform{
    constructor(private http: HttpClient) {}
    transform(value: any, ...args: any[]) {
        // this.http.get(value).pipe(
        //     catchError(err =>  of(err)),
        //     debounceTime(500)
        // ).subscribe(
        //     err => {
        //         if(err) {
        //             return "gecers'z"
        //         } else {
        //             return value
        //         }
        //     } 
        // )
        
    }

}