import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth';

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
export class DashboardComponent implements OnInit {

  userName: string | null = null;
  userRole: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userName = this.authService.getCurrentUser();
    this.userRole = this.authService.getRole();
  }
}
