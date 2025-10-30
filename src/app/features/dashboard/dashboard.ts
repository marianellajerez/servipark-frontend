import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; 
import { Sidenav } from './sidenav/sidenav';
import { Header } from './header/header';

@Component({
  selector: 'app-dashboard',
  standalone: true,

  imports: [ 
    RouterOutlet,
    Sidenav,
    Header
  ],

  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
}