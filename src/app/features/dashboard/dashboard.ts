import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '../../core/services/auth';

import { SidenavComponent } from './sidenav/sidenav';
import { RouterOutlet } from '@angular/router'; 

@Component({
  selector: 'app-dashboard',
  standalone: true,

  imports: [ 
    CommonModule,
    SidenavComponent, 
    RouterOutlet 
  ],

  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  userName: string | null = null;
  userRole: string | null = null;

  constructor(private auth: Auth) {}

  ngOnInit(): void {
    this.userName = this.auth.getCurrentUser();
    this.userRole = this.auth.getRole();
  }
}
