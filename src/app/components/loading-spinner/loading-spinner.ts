import { Component, OnInit } from "@angular/core";


@Component({
    selector: '<app-loading-spinner>',
    template: `<div class="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div></div>`,
    styleUrls: ['./loading-spinner.css']
})
export class LoadingSpinner implements OnInit{
    
    
    ngOnInit(): void {
     
    }

}