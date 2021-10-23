import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { count, filter } from 'rxjs/operators';

@Component({
  selector: 'app-pipes',
  templateUrl: './pipes.component.html',
  styleUrls: ['./pipes.component.css']
})
export class PipesComponent implements OnInit{
  servers: Server[] = [];
  filter: string = "";
  private serverCountSource = new BehaviorSubject<number>(this.servers.length);
  serverCount$ = this.serverCountSource.asObservable();
  serverCount: number;

  constructor(private route: ActivatedRoute, private router: Router) { }
  // ngOnDestroy(): void {
  //   throw new Error('Method not implemented.');
  // }

  ngOnInit(): void {
    this.hostServers();
    this.serverCountSource.next(this.servers.length);
  }

  hostServers() {
    this.servers = [
      {name: 'nginx', size: 'LARGE', date: new Date(2010, 7, 5), status: 'stable'},
      {name: 'apache', size: 'MEDIUM', date: new Date(2010, 7, 5), status: 'offline'},
      {name: 'amazon', size: 'MEDIUM', date: new Date(2010, 7, 5), status: 'offline'},
      {name: 'azure', size: 'SMALL', date: new Date(2010, 7, 5), status: 'stable'},
    ]
  }

  btn() {
    let newServer = {name: 'murat', size: 'MEDIUM', date: new Date(1995, 4, 16), status: 'stable'};
    this.servers.push(newServer);
    
    this.serverCountSource.next(this.servers.length);
  }

  onChange() {
    // this.router.navigate(['pipes'], {queryParams: {name: 'murat', age: 18}, queryParamsHandling: "preserve"});
    // this.router.navigate(['aa/5', ], {relativeTo: this.route}); // navigate ile relative path olusturmak icin relativeTo kullanilir
    /*
    relativeTo: ActivatedRoute
      Enables relative navigation from the current ActivatedRoute. This is applicable only to router.navigate() method.

      Example:

      The following Navigates to the Detail route from child route
    */
    
    this.router.navigate(['../recipes'], { relativeTo: this.route, skipLocationChange: true });
    /*
    skipLocationChange: boolean
    You can change the route, without changing the URL in the browser.  This Navigates to a new URL without pushing a new state into history.
    */
    
  }
}

export class Server {
  name: string;
  size: string;
  date: Date;
  status: string;

  constructor(name: string, size: string, date: Date, status: string) {
    name;
    size;
    date;
    status;
  }
}

