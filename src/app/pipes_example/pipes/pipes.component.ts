import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor() { }
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

